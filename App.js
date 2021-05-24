import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootBottomTab from './screens/tabs/RootBottomTab';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/authentication/Login';
import ForgetPwdScreen from './screens/authentication/ForgetPwd';
import ResetPwdScreen from './screens/authentication/ResetPwd';

import AuthContext from './context/AuthContext';
import ModuleContext from './context/ModuleContext';
import CacheConText from './context/CacheContext';

import { RestClient, WithAxios } from './helper/RestClient';
import { enableScreens } from 'react-native-screens';

import { IsTokenExpired } from './helper/AuthenticationUtils';
import { CompareString, ConvertApiName } from './helper/StringUtils';

import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import ChatRoot from './screens/tabs/chat/ChatRoot';
import { GetValueFromObject } from './helper/ObjectUtils';
import ThemeColor from './constants/ThemeColor';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
	/**********************Start Cache redux store***************************/
	function CheckDuplicatedArrayCache(prevArrayCache, newCache, targetFieldName) {
		if (prevArrayCache?.length > 0) {
			const existing = prevArrayCache.find(
				(prevCache) =>
					GetValueFromObject(prevCache, targetFieldName, targetFieldName) ===
					GetValueFromObject(newCache, targetFieldName, targetFieldName)
			);
			if (existing) {
				const newCacheList = prevArrayCache?.map((prevCache) => {
					if (
						GetValueFromObject(prevCache, targetFieldName, targetFieldName) ===
						GetValueFromObject(newCache, targetFieldName, targetFieldName)
					) {
						return newCache;
					}
				});
				//dup, update
				return newCacheList;
			} else {
				//not empty but not found
				return prevArrayCache.concat(newCache);
			}
		} else {
			//empty
			return [newCache];
		}
	}

	function CacheReducer(prevState, action) {
		switch (action.type) {
			case 'ADD_DESCRIBE_CACHE':
				return {
					...prevState,
					moduleDescribeList: CheckDuplicatedArrayCache(
						prevState.moduleDescribeList,
						action.data,
						'Name'
					)
				};
			case 'ADD_DESCRIBE_CACHE_NEW':
				if (prevState.moduleDescribeList?.length > 0) {
					const existing = prevState.moduleDescribeList.find(
						(describe) => describe.Name === action.data?.Name
					);
					if (existing) {
						const newModuleDescribeList = prevState.moduleDescribeList?.map((describe) => {
							if (describe.Name === action.data?.Name) {
								return action.data;
							}
						});
						//dup, update
						return {
							...prevState,
							moduleDescribeList: newModuleDescribeList
						};
					} else {
						//not empty but not found
						return {
							...prevState,
							moduleDescribeList: prevState.moduleDescribeList.concat(action.data)
						};
					}
				} else {
					//empty
					return {
						...prevState,
						moduleDescribeList: [action.data]
					};
				}

			case 'ADD_CACHE':
				return {
					...prevState,
					caches: prevState.caches?.concat(action.data)
				};
		}
	}
	/*
	{
		describe: [
			{
				"Name": "Contact",
				"API Name": "contact",
				"Type": "Main",
				"accessible": "true",
				"creatable": "true",
				"editable": "true",
				"deletable": "true",
				"Icon Url": "http://localhost:8181/secure",
				"Url": "http://localhost:8181/secure/module/contact/home",
				"Key Field": "Email",
				"Fields": [
					{
						"Name": "Owner",
						"VariableName": "Owner",
						"Type": "Lookup",
						"Updatable": "true",
						"Required": "true",
						"Unique": "false",
						"Allow Search": "false",
						"Default Value": "${User.FullName}"
					},
					...
				],
				"Relations": [
					{
						"Name": "",
						"Type": "Parent/Child"
					},
					...
				]
			},
			...
		]
	}
	*/
	const cacheInitState = {
		moduleDescribeList: [],
		caches: []
	};

	const [cacheState, CacheDispatch] = React.useReducer(CacheReducer, cacheInitState);
	const CacheActionContext = {
		GetAllCache: () => {
			return cacheState;
		},
		AddNewCache: (newCacheObj) => {
			CacheDispatch({ type: 'ADD_CACHE', data: newCacheObj });
		},
		AddDescribeCache: (describeCache) => {
			//console.log('AddDescribeCache');
			CacheDispatch({ type: 'ADD_DESCRIBE_CACHE', data: describeCache });
		},
		GetDescribe: (moduleName) => {
			//console.log('GetDescribe by', moduleName);
			//console.log('GetDescribe - cacheState?.moduleDescribeList', cacheState?.moduleDescribeList);

			if (cacheState?.moduleDescribeList && cacheState?.moduleDescribeList?.length) {
				return cacheState?.moduleDescribeList?.find((describe) => {
					return CompareString(describe?.Name, moduleName) === 0;
				});
			} else {
				return undefined;
			}
		}
	};
	/**********************End Cache redux store*****************************/

	/**********************Begin Authentication Process*****************************/
	function authReducer(prevState, action) {
		switch (action.type) {
			case 'CREATE_REST_CLIENT':
				return {
					...prevState,
					RestClient: RestClient()
				};
			case 'RESTORE_TOKEN':
				return {
					...prevState,
					isLoading: false,
					userData: action.data
				};
			case 'LOG_IN':
				//console.log('In reducer ', prevState.userData, action.data);
				return {
					...prevState,
					isLogout: false,
					userData: action.data
				};
			case 'LOG_OUT':
				return {
					...prevState,
					isLogout: true,
					userData: null,
					userProfile: null,
					apps: []
				};
			case 'SET_PROFILE':
				return {
					...prevState,
					isLogout: true,
					userProfile: action.data
				};
			case 'SET_APPS':
				return {
					...prevState,
					isLogout: true,
					apps: action.data
				};
			default:
				break;
		}
	}
	const authInitialState = {
		isLoading: true,
		isLogout: false,
		userData: null,
		userProfile: null,
		apps: [],
		RestClient: {}
	};
	const [authState, dispatch] = React.useReducer(authReducer, authInitialState);
	const AuthActionContext = {
		CreateRestClient: () => {
			dispatch({ type: 'CREATE_REST_CLIENT' });
		},
		RestClientInstance: () => {
			//console.log('[AuthActionContext - RestClientInstance]', authState?.RestClient);
			return authState?.RestClient;
		},
		login: async (loggedInUser) => {
			await AsyncStorage.setItem('userData', JSON.stringify(loggedInUser));
			dispatch({ type: 'LOG_IN', data: loggedInUser });
		},
		ManuallyLogOut: async () => {
			let query = new URLSearchParams({
				token: authState?.userData?.Token
			});
			let url = '/logout?' + query.toString();
			console.log('[App] logout url=', url);
			await RestClient()
				.delete(url)
				.then(
					(resp) => {
						showMessage({
							message: 'Log out successfully.',
							type: 'success'
						});

						AsyncStorage.removeItem('userData');
						dispatch({ type: 'LOG_OUT' });
					},
					(reject) => {
						showMessage({
							message: `Log out Failed.[${reject}]`,
							type: 'danger'
						});
					}
				)
				.catch((error) => {
					AsyncStorage.removeItem('userData');
					dispatch({ type: 'LOG_OUT' });
				});
		},
		logOut: async () => {
			await AsyncStorage.removeItem('userData');
			dispatch({ type: 'LOG_OUT' });
		},
		setProfile: async (userProfile) => {
			dispatch({ type: 'SET_PROFILE', data: userProfile });
		},
		setApps: async (apps) => {
			dispatch({ type: 'SET_APPS', data: apps });
		},
		userData: authState?.userData,
		profile: authState?.userProfile,
		apps: authState?.apps
	};
	/**********************End Authentication Process*****************************/

	/**********************Begin Module Information State Process*****************************/
	const moduleInfoInitialState = {
		isLoading: true,
		moduleName: '',
		describe: {},
		views: [],
		pageLayoutList: [],
		detailData: {},
		ScreenFlowStack: [],
		actionResult: {}
	};
	function moduleInfoReducer(prevState, action) {
		switch (action.type) {
			case 'SET_CURRENT_MODULE':
				return {
					...prevState,
					isLoading: false,
					moduleName: action.data,
					describe: {},
					views: [],
					pageLayoutList: [],
					detailData: {},
					ScreenFlowStack: [],
					actionResult: {}
				};
			case 'SET_ALL_VIEW':
				return {
					...prevState,
					isLoading: false,
					views: action.data
				};
			case 'SET_DESCRIBE':
				return {
					...prevState,
					isLoading: false,
					describe: action.data
				};
			case 'SET_PROFILE':
				return {
					...prevState,
					isLoading: false,
					userProfile: action.data
				};
			case 'SET_PAGE_LAYOUT_LIST':
				return {
					...prevState,
					isLoading: false,
					pageLayoutList: action.data
				};
			case 'SET_DETAIL_DATA':
				return {
					...prevState,
					isLoading: false,
					detailData: action.data
				};
			case 'ADD_FLOW_STACK':
				return {
					...prevState,
					isLoading: false,
					ScreenFlowStack: prevState.ScreenFlowStack.concat([action.data])
				};

			case 'SET_ACTION_RESULT':
				return {
					...prevState,
					isLoading: false,
					actionResult: action.data
				};
			case 'CLEAR_ACTION_RESULT':
				return {
					...prevState,
					isLoading: false,
					actionResult: null
				};
		}
	}

	const [moduleInfoState, ModuleInfoDispatch] = React.useReducer(
		moduleInfoReducer,
		moduleInfoInitialState
	);

	const moduleInfoContext = {
		GetModuleInfoState: () => moduleInfoState,
		SetCurrentModuleName: (moduleName) => {
			//console.log('[App.js] execute reducer - SetCurrentModuleName by module name =', moduleName);
			ModuleInfoDispatch({ type: 'SET_CURRENT_MODULE', data: moduleName });
		},
		SetAllViews: (listOfViews) => {
			//console.log('[App.js] execute reducer - SetAllViews');
			ModuleInfoDispatch({ type: 'SET_ALL_VIEW', data: listOfViews });
		},
		GetDescribe: (noduleName) => {},
		SetDescribe: (describe) => {
			//console.log('[App.js] execute reducer - SetDescribe');
			ModuleInfoDispatch({ type: 'SET_DESCRIBE', data: describe });
		},
		SetPageLayoutList: (pageLayoutList) => {
			ModuleInfoDispatch({ type: 'SET_PAGE_LAYOUT_LIST', data: pageLayoutList });
		},
		SetFullDetailData: (data) => {
			//console.log('[App.js] execute reducer - SetFullDetailData');
			ModuleInfoDispatch({ type: 'SET_DETAIL_DATA', data: data });
		},
		AddScreenFlowStack: (screen) => {
			/*screen = {
				"Id": "25a0cf89-d0bc-4edb-9816-aae6c75339ef",
				"PageName": "Key Information",
				"PageType": "Edit View"
			}*/
			ModuleInfoDispatch({ type: 'ADD_FLOW_STACK', data: screen });
		},
		ClearScreenFlowStack: () => {
			ModuleInfoDispatch({ type: 'Clear_FLOW_STACK' });
		},
		ResetCurrentModuleInfo: () => {
			ModuleInfoDispatch({ type: 'RESET_CURRENT_MODULE' });
		},
		//GET_ACTION_RESULT
		SetActionResult: (actionResult) => {
			//console.log('APP - SetActionResult: actionResult = ', actionResult);
			ModuleInfoDispatch({ type: 'SET_ACTION_RESULT', data: actionResult });
			//console.log(moduleInfoState.actionResult);
		},
		GetActionResult: () => {
			const actionResultData = moduleInfoState.actionResult;
			ModuleInfoDispatch({ type: 'CLEAR_ACTION_RESULT' });
			return actionResultData;
		}
	};

	/*End Module Information State Process */

	React.useEffect(() => {
		async function bootstrapAsync() {
			let data;
			try {
				data = await AsyncStorage.getItem('userData');

				//Check expired time

				if (data != null) {
					let tempData;
					if (typeof data === 'string') {
						tempData = JSON.parse(data);
					} else {
						tempData = data;
					}

					if ('TokenExpiryDate' in tempData) {
						if (IsTokenExpired(tempData.TokenExpiryDate)) {
							data = null;
						} else {
							data = tempData;
						}
					} else {
						data = null;
					}
				}
			} catch (e) {}

			dispatch({ type: 'RESTORE_TOKEN', data: data });
		}
		bootstrapAsync();
	}, []);

	React.useEffect(() => {
		async function FetchUserProfile() {
			let query = new URLSearchParams({
				token: authState?.userData?.Token
			});

			await authState?.RestClient.get('/profile?' + query.toString())
				.then(function (response) {
					//console.log('FetchUserProfile - success', response.data);
					AuthActionContext.setProfile(response.data);
				})
				.catch(function (error) {
					// handle error
					console.info('Exception axios.get', error);
				})
				.finally(function () {
					// always executed
				});
		}

		if (
			authState?.userData &&
			authState?.userData !== null &&
			typeof authState?.userData === 'object'
		) {
			FetchUserProfile();
		}

		return () => {};
	}, [authState.userData]);

	React.useEffect(() => {
		console.log('[App.js] first time useEffect');
		dispatch({ type: 'CREATE_REST_CLIENT' });
	}, []);

	return (
		<SafeAreaProvider>
			<AuthContext.Provider value={AuthActionContext}>
				<CacheConText.Provider value={CacheActionContext}>
					<ModuleContext.Provider value={moduleInfoContext}>
						<WithAxios>
							<NavigationContainer
								onStateChange={(naviState) => {
									//console.log('onStateChange', naviState.type);
								}}>
								<StatusBar style="auto" backgroundColor="#FFF" />

								<Stack.Navigator>
									{authState.isLoading ? (
										<Stack.Screen
											options={{ headerShown: false }}
											name="Splash"
											component={SplashScreen}
										/>
									) : authState.userData == null ? (
										<>
											<Stack.Screen
												options={{ headerShown: false }}
												name="Login"
												component={LoginScreen}
											/>
											<Stack.Screen
												options={{ headerShown: false, title: 'Forgot Password' }}
												name="ForgotPwd"
												component={ForgetPwdScreen}
											/>
										</>
									) : authState.userData?.IsTimeToChangePassword === true ? (
										<Stack.Screen
											initialParams={{ isForce: true }}
											options={{
												headerShown: true,
												title: 'Reset Password',
												headerStyle: {
													backgroundColor: ThemeColor.PRIMARY
												},
												headerTintColor: ThemeColor.INVERT_PRIMARY,
												headerTitleStyle: {
													fontWeight: 'bold'
												}
											}}
											name="ResetPwd"
											component={ResetPwdScreen}
										/>
									) : (
										<Stack.Screen
											options={{ headerShown: false }}
											name="MainScreen"
											component={RootBottomTab}
										/>
									)}
								</Stack.Navigator>
							</NavigationContainer>
							<FlashMessage position="top" />
						</WithAxios>
					</ModuleContext.Provider>
				</CacheConText.Provider>
			</AuthContext.Provider>
		</SafeAreaProvider>
	);
}
