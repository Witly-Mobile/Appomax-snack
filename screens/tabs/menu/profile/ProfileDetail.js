/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Button, Card, ListItem, Image } from 'react-native-elements';
import BaseStyles from '../../../../styles/component/BaseStyle';
import BottomSheetStyles from '../../../../styles/component/BottomSheetStyles';

import AuthContext from '../../../../context/AuthContext';
import ModuleContext from '../../../../context/ModuleContext';
import ThemeColor from '../../../../constants/ThemeColor';
import { ViewText } from '../../../../component/ViewText';
import { ViewImage } from '../../../../component/ViewImage';
import { FloatingButton } from '../../../../component/MyFloatingButton';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BottomSheetListComponent } from '../../../../component/BottomSheetComponent';
import { DoneMessageBox, ErrorMessageBox } from '../../../../component/MessageBox';
import { ERROR_FLAG, SUCCESS_FLAG } from '../../../../constants/Globals';
import { isObjectEmpty } from '../../../../helper/StringUtils';
import { useFocusEffect } from '@react-navigation/core';

const ProfileDetail = ({ navigation, route }) => {
	const { userData, profile } = React.useContext(AuthContext);
	const ModuleInfo = React.useContext(ModuleContext);
	const [statusBadge, setStatusBadge] = React.useState();

	React.useEffect(() => {
		ModuleInfo.SetCurrentModuleName('User');
		return () => {};
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			if (!isObjectEmpty(ModuleInfo.GetModuleInfoState()?.actionResult)) {
				let badge;
				let actionStatus = ModuleInfo.GetModuleInfoState()?.actionResult?.status;
				//console.log('actionStatus', actionStatus);
				if (actionStatus === SUCCESS_FLAG) {
					badge = (
						<DoneMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={setStatusBadge}
						/>
					);
				} else if (actionStatus === ERROR_FLAG) {
					badge = (
						<ErrorMessageBox
							message={ModuleInfo.GetModuleInfoState()?.actionResult?.message}
							SetStatusBadge={setStatusBadge}
						/>
					);
				}
				setStatusBadge(badge);
			}
		}, [ModuleInfo.GetModuleInfoState().actionResult])
	);

	function KeyInformationComponent(props) {
		const { profileData } = props;
		if (props == null || props?.profileData === null) {
			return <View />;
		} else {
			return (
				<View>
					<ViewText FieldName="User Name" TextValue={profileData?.Username} />
					<ViewText FieldName="Role" TextValue={profileData?.Role} />
					<ViewText FieldName="Status" TextValue={profileData?.Status} />
					<ViewText FieldName="Report To" TextValue={profileData['Report To']} />
				</View>
			);
		}
	}

	function ProfileInformationComponent(props) {
		const { profileData } = props;
		if (props == null || props?.profileData === null) {
			return <View />;
		} else {
			return (
				<View>
					<ViewText FieldName="Title" TextValue={profileData?.Title ?? '-'} />
					<ViewText FieldName="Email" TextValue={profileData?.Email} />
					<ViewText FieldName="First Name" TextValue={profileData['First Name']} />
					<ViewText FieldName="Last Name" TextValue={profileData['Last Name']} />
					<ViewText FieldName="Employee Code" TextValue={profileData['Employee Code']} />
					<ViewImage FieldName="Profile Picture" ImageData={profileData['Profile Picture']} />
				</View>
			);
		}
	}

	/*Bottom Sheet Varaiable */
	// ref
	const refRBSheet = React.useRef();

	// variables
	const snapPoints = React.useMemo(() => ['0%', '15%'], []);

	/*Floating button */
	const actionList = [
		{
			title: 'Edit',
			icon: 'account-edit',
			Location: 'Edit',
			nextPage: 'ProfileEdit',
			ActionBeforeNext: () => {
				navigation.navigate('ProfileEdit');
			},
			needDialog: false,
			dialogMessages: {}
		},
		{
			title: 'Reset Password',
			icon: 'lock-reset',
			Location: '',
			nextPage: 'c',
			ActionBeforeNext: () => {
				navigation.navigate('ResetPwd');
			},
			needDialog: false,
			dialogMessages: {}
		}
	];

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				{statusBadge}
				<View style={{ marginBottom: 20 }}>
					<Card containerStyle={{}} wrapperStyle={{}}>
						<Card.Title
							h4
							h4style={{ fontSize: 16 }}
							style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
							Key Information
						</Card.Title>
						<Card.Divider style={{ margin: 0 }} />
						<KeyInformationComponent profileData={profile} />
					</Card>
					<Card containerStyle={{}} wrapperStyle={{}}>
						<Card.Title
							h4
							h4style={{ fontSize: 16 }}
							style={[{ alignSelf: 'flex-start' }, BaseStyles.baseText]}>
							Profile Information
						</Card.Title>
						<Card.Divider />
						<ProfileInformationComponent profileData={profile} />
					</Card>
				</View>
			</ScrollView>

			<FloatingButton
				icon="microsoft-xbox-controller-menu"
				size={60}
				color={ThemeColor.PRIMARY}
				onPress={() => {
					refRBSheet.current.open();
				}}
			/>

			<BottomSheetListComponent
				RefRBSheet={refRBSheet}
				Navigation={navigation}
				Title="Profile Actions"
				ActionList={actionList}
			/>
		</View>
	);
};

export default ProfileDetail;
