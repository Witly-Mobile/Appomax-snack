/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Pressable,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import { Button, Card, ListItem, Image } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../../context/AuthContext';
import ModuleContext from '../../../context/ModuleContext';
import SidebarContext from '../../../context/SidebarContext';

import ThemeColor from '../../../constants/ThemeColor';
import {
	BuildImageSource,
	IsEmptyOrNullOrUndefined,
	isObjectEmpty
} from '../../../helper/StringUtils';
import { RestClient } from '../../../helper/RestClient';
import LoadingStyle from '../../../styles/component/LoadingStyle';
import { DoneMessageBox, ErrorMessageBox } from '../../../component/MessageBox';
import { ERROR_FLAG, SUCCESS_FLAG } from '../../../constants/Globals';
import { GetValueFromObject } from './../../../helper/ObjectUtils';

const MenuHome = ({ navigation, route }) => {
	const { RestClientInstance, userData, profile, ManuallyLogOut } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const [isLoading, setIsLoading] = React.useState(false);
	const [statusBadge, SetStatusBadge] = React.useState();

	const [profilePic, setProfilePic] = React.useState(null);
	let pic = require('./../../../assets/account-circle.png');

	const [sidebar, setSidebar] = React.useState({});

	React.useEffect(() => {
		let profilePictureUrl;

		async function InitialProfileImage() {
			if (profile) {
				const profilePictureObj = GetValueFromObject(profile, 'Profile Picture', 'Profile Picture');
				if (profilePictureObj) {
					profilePictureUrl = profilePictureObj['Image Url'];
					const imageSource = BuildImageSource(
						IsEmptyOrNullOrUndefined(profilePictureObj.Url)
							? profilePictureObj['Image Url']
							: profilePictureObj.Url
					);
					setProfilePic(imageSource);
				}
			}
		}

		async function FetchSidebar() {
			let query = new URLSearchParams({
				token: userData?.Token
			});

			//Load sidebar
			await RestClientInstance()
				.get('/sidebar?' + query.toString())
				.then(function (response) {
					setSidebar(response.data);
					InitialProfileImage();
				})
				.catch(function (error) {
					// handle error
					//console.info('[MenuHome-FetchSidebar] Exception axios.get', error);
				})
				.finally(function () {
					// always executed
					//console.log('/sidebar finally');
					setIsLoading(false);
				});
		}

		FetchSidebar();

		return () => {
			console.log('[Menu root] cleanup');
			profilePictureUrl = null;
		};
	}, []);

	const preferencesList = [
		{ title: 'Select Application', route: 'SystemAppSelection', iconName: '' },
		{ title: 'Application Settings', route: 'AppSetting', iconName: '' }
	];

	useFocusEffect(
		React.useCallback(() => {
			console.log('profile', profile['Date Format']);
			if (!isObjectEmpty(ModuleInfo.GetModuleInfoState()?.actionResult)) {
				let badge;
				let actionStatus = ModuleInfo.GetModuleInfoState()?.actionResult?.status;
				//console.log('actionStatus', actionStatus);
				if (actionStatus === SUCCESS_FLAG) {
					badge = (
						<DoneMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={SetStatusBadge}
						/>
					);
				} else if (actionStatus === ERROR_FLAG) {
					badge = (
						<ErrorMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={SetStatusBadge}
						/>
					);
				}
				SetStatusBadge(badge);
			}
		}, [ModuleInfo.GetModuleInfoState().actionResult])
	);

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
			{statusBadge}
			<Card containerStyle={{}} wrapperStyle={{}}>
				<Card.Title
					h4
					h4style={{ fontSize: 16 }}
					style={[{ alignSelf: 'flex-start' }, styles.text]}>
					My Account
				</Card.Title>
				<Card.Divider />
				<View style={{ alignItems: 'center' }}>
					<Card.Image
						source={{}}
						style={{
							width: 150,
							height: 150,
							marginBottom: 10
						}}>
						{profilePic !== null ? (
							<Image
								containerStyle={{ borderRadius: 100 }}
								placeholderStyle={{}}
								transitionDuration={1000}
								resizeMode="contain"
								resizeMethod="resize"
								source={profilePic}
								style={{ width: 150, height: 150, borderRadius: 100 }}
							/>
						) : (
							<Icon
								name="account-circle"
								size={150}
								color={ThemeColor.BaseComponent}
								style={{ alignSelf: 'center' }}
							/>
						)}
					</Card.Image>
					<View style={{ marginBottom: 10, alignItems: 'center' }}>
						<Card.FeaturedTitle
							h4
							h4Style={{ fontWeight: '900' }}
							ellipsizeMode="tail"
							numberOfLines={1}
							style={[styles.text, styles.titleText]}>
							{profile?.Username}
						</Card.FeaturedTitle>
						<Card.FeaturedSubtitle
							ellipsizeMode="tail"
							numberOfLines={1}
							style={[styles.text, styles.subTitleText]}>
							{profile?.Role}
						</Card.FeaturedSubtitle>
						<Card.FeaturedSubtitle
							ellipsizeMode="tail"
							numberOfLines={1}
							style={[styles.text, styles.subTitleText]}>
							{profile?.Email}
						</Card.FeaturedSubtitle>
					</View>
					<Button
						icon={<Icon name="eye-outline" size={20} color={ThemeColor.BaseComponent} />}
						type="outline"
						title="View Full Info"
						onPress={() => navigation.navigate('ProfileDetail')}
						iconContainerStyle={{ marginEnd: 10 }}
						titleStyle={{ color: ThemeColor.BaseComponent, marginStart: 5 }}
						buttonStyle={{
							borderColor: ThemeColor.BaseComponent,
							justifyContent: 'center'
						}}
						containerStyle={{ marginHorizontal: 20 }}
					/>
				</View>
			</Card>
			<Card containerStyle={{}} wrapperStyle={{}}>
				<Card.Title
					h4
					h4style={{ fontSize: 16 }}
					style={[{ alignSelf: 'flex-start' }, styles.text]}>
					Preferences
				</Card.Title>
				<Card.Divider />
				{preferencesList?.map((pref, index) => {
					return (
						<ListItem
							key={index}
							bottomDivider
							Component={TouchableHighlight}
							underlayColor="red"
							activeOpacity={10}
							onPress={() =>
								navigation.navigate(pref?.route, {
									sidebar: sidebar
								})
							}>
							<ListItem.Content>
								<ListItem.Title style={{ color: ThemeColor.BaseComponent }}>
									{pref?.title}
								</ListItem.Title>
							</ListItem.Content>
							<ListItem.Chevron color={ThemeColor.BaseComponent} />
						</ListItem>
					);
				})}
			</Card>
			<Card containerStyle={{}} wrapperStyle={{}}>
				<Card.FeaturedSubtitle style={[styles.text, styles.subTitleText]}>
					Build: 10210
				</Card.FeaturedSubtitle>
				<Button
					loading={isLoading}
					loadingProps={{ color: 'red' }}
					icon={<Icon name="logout" size={20} color="red" />}
					type="outline"
					title="Log out"
					onPress={() => {
						setIsLoading(true);
						ManuallyLogOut();
					}}
					iconContainerStyle={{ marginEnd: 10 }}
					titleStyle={{ color: 'red', marginStart: 5 }}
					buttonStyle={{ borderColor: 'red', borderWidth: 2, justifyContent: 'center' }}
					containerStyle={{}}
				/>
			</Card>
			<View />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	text: {
		color: ThemeColor.BaseComponent
	},
	titleText: {},
	subTitleText: {
		fontWeight: '100',
		fontSize: 16
	}
});
export default MenuHome;
