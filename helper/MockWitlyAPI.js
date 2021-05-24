export const LoginAPI = () => {
	const json = {
		Username: 'sujinda',
		Fullname: 'Sujinda Ponyiam',
		Email: 'Sujinda@easset.co.th',
		LandingUrl: 'https://witly.co/secure/mobile-home?mt=df0ce2785c324e559beb29168b91079c',
		ProfileUrl: 'https://witly.co/secure/profile/sujinda?mt=df0ce2785c324e559beb29168b91079c',
		ProfileImageUrl:
			'https://witly.co/secure/res/EASSET/Assets/Field-Images/202001/03cfa904-036a-441a-af6c-e98e877f18b4.gif',
		Token: 'df0ce2785c324e559beb29168b91079c',
		TokenExpiryDate: '2021-02-22T15:53:06.1311886+07:00',
		ThemeColorCode: '#554242'
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const SidebarAPI = () => {
	const json = {
		Notification: {
			Count: 0,
			'Landing Url': 'https://witly.co/secure/notifications?mt=df0ce2785c324e559beb29168b91079c'
		},
		Search: {
			'Landing Url':
				'https://witly.co/secure/search?in=&keyword={0}&mt=df0ce2785c324e559beb29168b91079c'
		},
		Apps: [
			{
				id: '0',
				Name: 'All Apps',
				'Icon Url': 'https://witly.co/secure'
			},
			{
				id: 'd20565bd-2452-4871-a845-60a4d9881a64',
				Name: 'DevForce',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/app-icons/d20565bd-2452-4871-a845-60a4d9881a64_48px.png'
			},
			{
				id: '017385fa-a11a-4539-81a6-a17840abe806',
				Name: 'EAsset',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/app-icons/6a5d9bac-da40-4c04-aa46-af803e4e0fba_48px.png'
			},
			{
				id: 'a48bf59f-7d5a-4410-ba19-ae88f1944c9b',
				Name: 'Witly',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/app-icons/b9b68dfe-bff6-4ad1-8e5b-7dd6ad62cb8b_48px.png'
			}
		],
		Module: [
			{
				Name: 'Calendar',
				'Icon Url': 'https://witly.co/secure/theme/material/images/calendar_48px.png',
				'Landing Url': 'https://witly.co/secure/calendar?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Project',
				'Icon Url': 'https://witly.co/secure',
				'Landing Url':
					'https://witly.co/secure/module/project/home?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Project Task',
				'Icon Url': 'https://witly.co/secure',
				'Landing Url':
					'https://witly.co/secure/module/project-task/home?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Check List',
				'Icon Url': 'https://witly.co/secure',
				'Landing Url':
					'https://witly.co/secure/module/check-list/home?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Issues',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/d599056b-a27c-433e-bdda-6e66e6a773fa_48px.png',
				'Landing Url':
					'https://witly.co/secure/module/issues/home?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Reports',
				'Icon Url': 'https://witly.co/secure/theme/material/images/report_48px.png',
				'Landing Url': 'https://witly.co/secure/report?mt=df0ce2785c324e559beb29168b91079c'
			},
			{
				Name: 'Dashboards',
				'Icon Url': 'https://witly.co/secure/theme/material/images/dashboard_48px.png',
				'Landing Url': 'https://witly.co/secure/dashboard?mt=df0ce2785c324e559beb29168b91079c'
			}
		],
		'Recently Viewed': [
			{
				'Object Name': '210007',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/D599056B-A27C-433E-BDDA-6E66E6A773FA_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/issues/_210007?id=MWZkMTY3NmItZjlkYS00ZTg2LTlmNDItMDhhMDU2NGUzYmYx&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Issues'
			},
			{
				'Object Name': '210006',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/D599056B-A27C-433E-BDDA-6E66E6A773FA_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/issues/_210006?id=MDA4ZGQ3MGQtNWY3YS00NjQ4LWI3NDYtODdkNzJiMTczMDU4&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Issues'
			},
			{
				'Object Name': '210004',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/D599056B-A27C-433E-BDDA-6E66E6A773FA_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/issues/_210004?id=OGY0MDc4MzAtZDg1My00ZjM2LWE5YjUtOTcyZGU0MTQ3YmM3&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Issues'
			},
			{
				'Object Name': 'iMaintain',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/B4A6F986-EBFB-4F0F-9559-AD14608BAADB_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/project-task/_imaintain?id=NDEyZWMxYWYtZmJlNS00NjQwLWExNzEtZDg4ZjJiZGQyZmVj&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Project Task'
			},
			{
				'Object Name': 'Witly (Main Development)',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/71F23E78-F583-4D0C-B985-5A3B4B8A6ADF_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/project/_witly-(main-development)?id=MWVmY2UxMWMtYzg1YS00NTExLWE5MzYtOTRhNzA0OTQxNDg2&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Project'
			},
			{
				'Object Name': 'CL-21-000218',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/22C512F0-57E3-43B3-88E3-024D578ECD20_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/check-list/_cl-21-000218?id=MTQ2N2ZjYjQtY2YxOC00NjQ4LTgzMjAtMDM5NzJhMTVhZjM2&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Check List'
			},
			{
				'Object Name': '[Prescreen] Vplus SQL Loader B',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/B4A6F986-EBFB-4F0F-9559-AD14608BAADB_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/project-task/_[prescreen]-vplus-sql-loader-batch?id=ZGM5NjE2Y2YtNTNiYS00NDlmLWFhOWUtNDc1YjAxZGQwNTY1&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Project Task'
			},
			{
				'Object Name': 'CRM Next',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/71F23E78-F583-4D0C-B985-5A3B4B8A6ADF_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/project/_crm-next?id=MmI0YjFjMzgtNDhiNi00MDU2LWJjNGMtMzYzMjFkMDFiZDYy&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Project'
			},
			{
				'Object Name': 'Lead Fulfillment',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/B4A6F986-EBFB-4F0F-9559-AD14608BAADB_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/project-task/_lead-fulfillment?id=MTg1YmI2YzAtNTkzMi00MzUxLWFhOGUtOWY2Y2E2NjBlNDIy&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Project Task'
			},
			{
				'Object Name': '210009',
				'Icon Url':
					'https://witly.co/secure/res/easset/images/module-icons/D599056B-A27C-433E-BDDA-6E66E6A773FA_16px.png',
				'Landing Url':
					'https://witly.co/secure/module/issues/_210009?id=NTFiNWUzOTAtYmZlNy00MjZkLTkzNWItZDFiNjI3NzNiMmEx&mt=df0ce2785c324e559beb29168b91079c',
				'Module Name': 'Issues'
			}
		],
		'Favorite Records': [],
		'Favorite Views': []
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(json);
		}, 100);
	});
};

export const UserDescribeAPI = () => {
	const json = {
		Name: 'User',
		'API Name': 'user',
		Type: 'System',
		accessible: 'true',
		creatable: 'true',
		editable: 'true',
		deletable: 'true',
		'Icon Url': 'http://localhost:8181/secure',
		Url: 'http://localhost:8181/secure/module/user/home',
		'Key Field': '',
		Fields: [
			{
				Name: 'Job Title',
				VariableName: 'JobTitle',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '',
				'List Value': [
					{
						Name: 'Sale',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Sale Executiive',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Sale Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Marketing Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Customer Service',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Marketing',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'General Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Purchasing Officer',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Purchasing Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Vice President',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Executive Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Administrative Manager',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'President of thailand',
						'Display As': 'None',
						Value: {}
					}
				]
			},
			{
				Name: 'Employee Code',
				VariableName: 'EmployeeCode',
				Type: 'Text',
				Length: 25,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Title',
				VariableName: 'Title',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '',
				'List Value': [
					{
						Name: 'Mrs.',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Mr.',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'eeee',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Khun',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Ms.',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Miss',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'Dr.',
						'Display As': 'None',
						Value: {}
					}
				]
			},
			{
				Name: 'First Name',
				VariableName: 'FirstName',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Last Name',
				VariableName: 'LastName',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Birth Date',
				VariableName: 'BirthDate',
				Type: 'Date',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Description',
				VariableName: 'Description',
				Type: 'Text',
				Length: 500,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Address_Name',
				VariableName: 'AddressName',
				Type: 'Text',
				Length: 100,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Address - Continued',
				VariableName: 'AddressContinued',
				Type: 'Text',
				Length: 100,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'City/District',
				VariableName: 'CityDistrict',
				Type: 'Text',
				Length: 100,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'State/Province',
				VariableName: 'StateProvince',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '',
				'List Value': [
					{
						Name: 'BKK',
						'Display As': 'None',
						Value: {}
					},
					{
						Name: 'CNX',
						'Display As': 'None',
						Value: {}
					}
				]
			},
			{
				Name: 'Zip/Postal code',
				VariableName: 'ZipPostalCode',
				Type: 'Text',
				Length: 100,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Phone',
				VariableName: 'Phone',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Mobile',
				VariableName: 'Mobile',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Fax',
				VariableName: 'Fax',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Website',
				VariableName: 'Website',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Email',
				VariableName: 'Email',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Signature Image',
				VariableName: 'SignatureImage',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Profile Picture',
				VariableName: 'ProfilePicture',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Start Working Date',
				VariableName: 'StartWorkingDate',
				Type: 'Date',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Seller Name',
				VariableName: 'SellerName',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			},
			{
				Name: 'Personal Leaved',
				VariableName: 'PersonalLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Sick Leaved',
				VariableName: 'SickLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Annual Leaved',
				VariableName: 'AnnualLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Working Experience',
				VariableName: 'WorkingExperience',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Other Leaved',
				VariableName: 'OtherLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Maternity Leaved',
				VariableName: 'MaternityLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Ordination Leaved',
				VariableName: 'OrdinationLeaved',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': '0'
			},
			{
				Name: 'Salary',
				VariableName: 'Salary',
				Type: 'Number',
				Length: 10,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Allow Search': 'false',
				'Default Value': ''
			}
		],
		Relations: []
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

/*Check List */
export const ChecklistActionListAPI = () => {
	const json = [
		{
			Name: 'Edit',
			Location: 'Detail',
			'Action Type': '',
			'Module Relation': '',
			'Action Type Detail': {}
		},
		{
			Name: 'Delete',
			Location: 'Detail',
			'Action Type': '',
			'Module Relation': '',
			'Action Type Detail': {}
		},
		{
			Name: 'Clone',
			Location: 'Detail',
			'Action Type': '',
			'Module Relation': '',
			'Action Type Detail': {}
		},
		{
			Name: 'Log',
			Location: 'Detail',
			'Action Type': '',
			'Module Relation': '',
			'Action Type Detail': {}
		},
		{
			Name: 'Sharing',
			Location: 'Detail',
			'Action Type': '',
			'Module Relation': '',
			'Action Type Detail': {}
		}
	];
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 400);
	});
};

export const ChecklistViewAPI = () => {
	const json = [
		{
			id: 'a8abd106-8046-43e2-aceb-bae1b57518fb',
			Name: 'All DROS 2 Check List - Start 2020',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'aaddssaa-8046-43e2-aceb-bae1b57518fb',
			Name: 'Check List - List View',
			'Report Type': 'List View',
			Description: ''
		}
	];
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 400);
	});
};

export const CheckListRecordsOfViewAPI = (reportId, reportType) => {
	const json = {
		'Total Records': 1609,
		Header: [
			'Project Task',
			'Ref no',
			'Check List Name',
			'Check List Location',
			'Start Date',
			'End Date',
			'Man Day',
			'Check List Owner'
		],
		Records: [
			{
				id: '4957c088-2505-4eb0-9b00-55bbe0cf49a4',
				'Project Task': 'Mini NAOS',
				'Ref no': 'CL-20-001610',
				'Check List Name': 'get data for getApplicationInfo service',
				'Check List Location': 'Office',
				'Start Date': '2020-12-29T16:30:00',
				'End Date': '2020-12-30T01:30:00',
				'Man Day': 1.0,
				'Check List Owner': 'Natnaree Pataradool'
			},
			{
				id: 'd8f2ae6e-b3ff-4e54-a521-8c5a8aab5082',
				'Project Task': 'iMaintain',
				'Ref no': 'CL-20-001605',
				'Check List Name': 'ทำ ExportData',
				'Check List Location': 'Office',
				'Start Date': '2020-12-29T16:00:00',
				'End Date': '2020-12-30T01:00:00',
				'Man Day': 1.0,
				'Check List Owner': 'Phichai Paohom'
			},
			{
				id: '5653b305-4649-4722-954d-2b5b5a8f0d64',
				'Project Task': 'Mini NAOS',
				'Ref no': 'CL-20-001609',
				'Check List Name': 'get data for getApplicationInfo service',
				'Check List Location': 'Office',
				'Start Date': '2020-12-28T16:30:00',
				'End Date': '2020-12-29T01:30:00',
				'Man Day': 1.0,
				'Check List Owner': 'Natnaree Pataradool'
			},
			{
				id: 'b3a2e863-4b45-4ee8-bb00-037dc97932e3',
				'Project Task': 'iMaintain',
				'Ref no': 'CL-20-001604',
				'Check List Name': 'ทำ Style Sheet หน้า Account & Operations Feed',
				'Check List Location': 'Office',
				'Start Date': '2020-12-28T16:00:00',
				'End Date': '2020-12-29T01:00:00',
				'Man Day': 1.0,
				'Check List Owner': 'Phichai Paohom'
			},
			{
				id: '7c5babcc-5d90-4392-9472-5e41779032cf',
				'Project Task': 'Update Sell Result',
				'Ref no': 'CL-20-001602',
				'Check List Name': 'ทำ kafka-retry-batch',
				'Check List Location': null,
				'Start Date': '2020-12-28T16:00:00',
				'End Date': '2020-12-28T23:10:00',
				'Man Day': 0.7708,
				'Check List Owner': 'Prachaya Surarak'
			}
		]
	};

	const listJson = {
		'Total Records': 1,
		'Report Type': 'List View',
		Name: '',
		Template: {
			'Description 1': 'Check List Name',
			'Description 2': 'Check List Location',
			'Description 3': 'Project Task',
			'Description 4': 'Ref no',
			Image: '',
			'Image Icon': '',
			List: 'Status' //find list from describe
		},
		Records: [
			{
				id: '4957c088-2505-4eb0-9b00-55bbe0cf49a4',
				'Project Task': 'Mini NAOS',
				'Ref no': 'CL-20-001610',
				'Check List Name': 'get data for getApplicationInfo service',
				'Check List Location': 'Office',
				'Start Date': '2020-12-29T16:30:00',
				'End Date': '2020-12-30T01:30:00',
				'Man Day': 1.0,
				'Check List Owner': 'Natnaree Pataradool',
				Status: 'Pending'
			},
			{
				id: 'd8f2ae6e-b3ff-4e54-a521-8c5a8aab5082',
				'Project Task': 'iMaintain',
				'Ref no': '',
				'Check List Name': 'ทำ ExportData',
				'Check List Location': 'Office',
				'Start Date': '2020-12-29T16:00:00',
				'End Date': '2020-12-30T01:00:00',
				'Man Day': 1.0,
				'Check List Owner': 'Phichai Paohom',
				Status: 'Pending'
			},
			{
				id: '5653b305-4649-4722-954d-2b5b5a8f0d64',
				'Project Task': 'Mini NAOS',
				'Ref no': 'CL-20-001609',
				'Check List Name': 'get data for getApplicationInfo service',
				'Check List Location': 'Office',
				'Start Date': '2020-12-28T16:30:00',
				'End Date': '2020-12-29T01:30:00',
				'Man Day': 1.0,
				'Check List Owner': 'Natnaree Pataradool',
				Status: 'Approved'
			},
			{
				id: 'b3a2e863-4b45-4ee8-bb00-037dc97932e3',
				'Project Task': 'iMaintain',
				'Ref no': 'CL-20-001604',
				'Check List Name': 'ทำ Style Sheet หน้า Account & Operations Feed',
				'Check List Location': 'Office',
				'Start Date': '2020-12-28T16:00:00',
				'End Date': '2020-12-29T01:00:00',
				'Man Day': 1.0,
				'Check List Owner': 'Phichai Paohom',
				Status: ''
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(reportType === 'List View' ? JSON.stringify(listJson) : JSON.stringify(json));
		}, 100);
	});
};

export const CheckListDescribeAPI = () => {
	const json = {
		Name: 'Check List',
		'API Name': 'check-list',
		Type: 'Main',
		accessible: 'true',
		creatable: 'true',
		editable: 'true',
		deletable: 'true',
		'Icon Url': 'https://witly.co/secure',
		Url: 'https://witly.co/secure/module/check-list/home',
		'Key Field': 'Ref no',
		Fields: [
			{
				Name: 'Additional Pic',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Check List Owner',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '${User.FullName}'
			},
			{
				Name: 'Check List Name',
				Type: 'Text',
				Length: 500,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Project Task',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Check List Location',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '',
				'List Value': ['Office', 'On site', 'Remote']
			},
			{
				Name: 'Start Date',
				Type: 'DateTime',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'End Date',
				Type: 'DateTime',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'All Day',
				Type: 'Checkbox',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Lunch',
				Type: 'Checkbox',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Exclude',
				Type: 'Checkbox',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Day',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '0'
			},
			{
				Name: 'Role',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '',
				'List Value': ['PM', 'BA', 'SA', 'DEV', 'Jr. DEV', 'QA', 'Jr. QA', 'DOC', 'Intern']
			},
			{
				Name: 'Total Time',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '0'
			},
			{
				Name: 'Ms Time',
				Type: 'BigNumber',
				Length: 19,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '0'
			},
			{
				Name: 'Man Day',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '0'
			},
			{
				Name: 'Ref no',
				Type: 'AutoNumber',
				Length: 0,
				Updatable: 'false',
				Required: 'false',
				Unique: 'true',
				'Default Value': 'CL-${yy:Date.Now}-${000000:RunningNo.Year.Next}'
			},
			{
				Name: 'Import No',
				Type: 'TinyNumber',
				Length: 3,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '0'
			},
			{
				Name: 'Solution Attach File',
				Type: 'File',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			}
		],
		Relations: []
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const CheckListPageLayoutList = () => {
	const json = [
		{
			id: '4fba7e74-ea35-4e52-b347-78b33d210215',
			'Page Name': 'Default Detail Layout',
			'Page Type': 'Detail View',
			'Role Name': 'Administrator',
			'First Page': true
		},
		{
			id: '4801bae6-e5aa-4b3a-9b46-ac17b2a46e24',
			'Page Name': 'Custom Edit Layout',
			'Page Type': 'Custom Edit',
			'Role Name': 'Administrator',
			'First Page': true
		},
		{
			id: '4898efb5-6045-4c0f-9232-70bd19f1a2c3',
			'Page Name': 'Default Edit Layout',
			'Page Type': 'Edit View',
			'Role Name': 'Administrator',
			'First Page': true
		}
	];
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const CheckListPageLayoutDetail = (id) => {
	const jsonDetail = {
		ModuleName: 'Check List',
		PageType: 'Detail View',
		Layout: [
			{
				SectionName: 'Key Information',
				SectionType: 'fieldset',
				Fields: [
					'Check List Name',
					'Project Task',
					'Check List Owner',
					'Check List Location',
					'Role',
					'Start Date',
					'End Date',
					'Man Day',
					'Ref no'
				]
			},
			{
				SectionName: 'Update Information',
				SectionType: 'fieldset',
				Fields: ['Created Date', 'Created By', 'Last Modified Date', 'Last Modified By']
			}
		]
	};
	const jsonEdit = {
		ModuleName: 'Check List',
		PageType: 'Edit View',
		Layout: [
			{
				SectionName: 'Key Information',
				SectionType: 'fieldset',
				Fields: [
					'Check List Name',
					'Project Task',
					'Check List Owner',
					'Check List Location',
					'Role',
					'Start Date',
					'End Date',
					'All Day',
					'Exclude',
					'Lunch'
				]
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			let json;
			if (id === '4fba7e74-ea35-4e52-b347-78b33d210215') {
				//detail
				json = jsonDetail;
			} else if (id === '4898efb5-6045-4c0f-9232-70bd19f1a2c3') {
				//edit
				json = jsonEdit;
			} else {
				json = jsonDetail;
			}
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const CheckListPageLayoutEdit = (id) => {
	const jsonEdit = {
		ModuleName: 'Check List',
		PageType: 'Edit View',
		Layout: [
			{
				SectionName: 'Key Information',
				SectionType: 'fieldset',
				Fields: [
					'Check List Name',
					'Project Task',
					'Check List Owner',
					'Check List Location',
					'Role',
					'Start Date',
					'End Date',
					'All Day',
					'Exclude',
					'Lunch'
				]
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(jsonEdit));
		}, 100);
	});
};

export const ChecklistModuleDetailAPI = (id) => {
	const json = {
		id: '4957c088-2505-4eb0-9b00-55bbe0cf49a4',
		editable: 'true',
		deletable: 'true',
		cloneable: 'true',
		data: [
			{
				'section name': 'Key Information',
				'section type': 'fieldset',
				content: {
					'Check List Name': 'get data for getApplicationInfo service',
					'Project Task': 'Mini NAOS',
					'Check List Owner': 'Natnaree Pataradool',
					'Check List Location': 'Office',
					Role: 'DEV',
					'Start Date': '2020-12-29T09:30:00.0000000',
					'End Date': '2020-12-29T18:30:00.0000000',
					'Man Day': '1.0000',
					'Ref no': 'CL-20-001610',
					'Additional Pic': {
						Name: 'Meow Meow Meow',
						'Content Type': 'image/jpeg',
						'Storage Id': '7814fdd3-8f6b-48d2-b6de-9af1526aec9b',
						Url: 'https://static.bangkokpost.com/media/content/dcx/2020/08/17/3722547.jpg'
					},
					'Solution Attach File': {
						Name: 'Witly mobile - tasks.docx',
						'Content Type':
							'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						'Storage Id': '0cf1e99a-422c-4fd3-b263-e7ad5c969a2f',
						Url:
							'https://witly.co/secure/res/EASSET/Assets/Field-Files/202103/75fdbf34-8b87-42a2-a8a8-925a69e96fe1.docx'
					}
				}
			},
			{
				'section name': 'Update Information',
				'section type': 'fieldset',
				content: {
					'Created Date': '2020-12-30T10:15:07.0770000',
					'Created By': 'Natnaree Pataradool',
					'Last Modified Date': '2020-12-30T10:15:07.5230000',
					'Last Modified By': 'Natnaree Pataradool'
				}
			}
		]
	};

	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const ChecklistLookupAPI = () => {
	const json = {
		ModuleName: 'Project Task',
		LookupField: 'Task name',
		ListValue: [
			{
				id: '351fc51e-24cc-463d-b90b-c17908a171ae',
				'Task Name': 'SA + Meeting'
			},
			{
				id: 'ba4da97a-ff5e-45c1-9908-682a32bc9f57',
				'Task Name': 'Design'
			},
			{
				id: '08dc6d78-2434-4ca0-b39b-622a15cc2490',
				'Task Name': '[WAS] Dev Transaction API'
			},
			{
				id: '41db0366-5e6e-45ba-a94b-d39a04d46196',
				'Task Name': '[Prescreen] Naos Application Detail Inquiry'
			},
			{
				id: '6af51b2b-1518-4032-ab7a-513cda1cfa46',
				'Task Name': 'Data Entry - Auto Reject ACC at DE'
			},
			{
				id: 'd18edd6a-42b5-476f-8694-a61b1c6352d0',
				'Task Name': 'CA Screen - Add Condition to allow BAN Exception'
			},
			{
				id: '08dc6d78-2434-4ca0-b39b-622a15cc2490',
				'Task Name': '[WAS] Dev Transaction API'
			},
			{
				id: '41db0366-5e6e-45ba-a94b-d39a04d46196',
				'Task Name': '[Prescreen] Naos Application Detail Inquiry'
			},
			{
				id: '6af51b2b-1518-4032-ab7a-513cda1cfa46',
				'Task Name': 'Data Entry - Auto Reject ACC at DE'
			},
			{
				id: 'd18edd6a-42b5-476f-8694-a61b1c6352d0',
				'Task Name': 'CA Screen - Add Condition to allow BAN Exception'
			},
			{
				id: '08dc6d78-2434-4ca0-b39b-622a15cc2490',
				'Task Name': '[WAS] Dev Transaction API'
			},
			{
				id: '41db0366-5e6e-45ba-a94b-d39a04d46196',
				'Task Name': '[Prescreen] Naos Application Detail Inquiry'
			},
			{
				id: '6af51b2b-1518-4032-ab7a-513cda1cfa46',
				'Task Name': 'Data Entry - Auto Reject ACC at DE'
			},
			{
				id: 'd18edd6a-42b5-476f-8694-a61b1c6352d0',
				'Task Name': 'CA Screen - Add Condition to allow BAN Exception'
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(json);
		}, 100);
	});
};

export const ChecklistSubmitEditForm = (formData) => {
	const json = {
		Id: '25a0cf89-d0bc-4edb-9816-aae6c75339ef',
		PageName: 'Key Information',
		PageType: 'Edit View'
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

/*Issues */

export const IssueViewAPI = () => {
	const json = [
		{
			id: 'd5d99338-aed4-4589-b1bb-0e9c0dd6885e',
			Name: 'All DROS2 Issue ',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'a86a18a9-eb9a-4ba7-b508-a0d547ad212e',
			Name: 'All DROS2 Issue - [SA]',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'b4d9c759-079f-4952-8a9c-cf18aa595ec2',
			Name: 'All DROS2 Issue - Sujinda Ponyiam',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '93bd8b6a-e9ac-4038-bfbb-7e342de9275e',
			Name: 'All Issue - Sujinda Ponyiam',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '47f0c54a-2356-4b32-88ae-01f6fa30081f',
			Name: 'All Issue (DRGS)',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '05675b20-2cd6-4253-aac8-46262d82d2ec',
			Name: 'All Issue (DRS)',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '0ff5e559-1cb3-4aed-b174-a069bc3c875c',
			Name: 'All Issue (Witly Main)',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'fc327df5-632e-4d18-bf7a-9eadd858e2ab',
			Name: 'All Issue exclude complete, cancel',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'a1e9b71a-ca7f-4e12-a901-a348e5487e4f',
			Name: 'All Issue exclude complete, cancel for everyone',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '5a02dcd0-41b5-4486-8bc6-a7e92c669b6a',
			Name: 'DROS2-list',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '93fa23b7-e170-43d2-b346-99a7fa39c5b5',
			Name: 'Issue - Witly R11',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: 'f3d22c1f-83ac-43d7-a47a-8d2ecbff7e5c',
			Name: 'TODO Issue - Sujinda Ponyiam',
			'Report Type': 'Grid View',
			Description: ''
		},
		{
			id: '0d3bf14e-c8d7-45b3-a20e-93769a28f017',
			Name: 'Witly iMaintain Requirements',
			'Report Type': 'List View',
			Description: ''
		}
	];
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const IssueDescribeAPI = () => {
	const json = {
		Name: 'Issues',
		'API Name': 'issues',
		Type: 'Main',
		accessible: 'true',
		creatable: 'true',
		editable: 'true',
		deletable: 'true',
		'Icon Url':
			'https://witly.co/secure/res/easset/images/module-icons/d599056b-a27c-433e-bdda-6e66e6a773fa_48px.png',
		Url: 'https://witly.co/secure/module/issues/home',
		'Key Field': 'Issue No',
		Fields: [
			{
				Name: 'Issue Owner',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '${User.FullName}'
			},
			{
				Name: 'Project',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Affects Version',
				Type: 'Text',
				Length: 50,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Subject',
				Type: 'Text',
				Length: 200,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Description',
				Type: 'TextArea',
				Length: 100,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Priority',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '',
				'List Value': ['High', 'Medium', 'Low']
			},
			{
				Name: 'Report Channel',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '',
				'List Value': ['Line', 'Call', 'Email', 'Other']
			},
			{
				Name: 'Attach File',
				Type: 'File',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Attach Image1',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Attach Image2',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Attach Image3',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Report Date',
				Type: 'DateTime',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '${Date.Now}'
			},
			{
				Name: 'Response Date',
				Type: 'DateTime',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Closed Date',
				Type: 'DateTime',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Status',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '',
				'List Value': [
					'Hold',
					'Backlog',
					'In Progress',
					'Resolved',
					'Testing',
					'Reopened',
					'Need Review',
					'Closed',
					'Cancelled',
					'Waiting for User',
					'Waiting for Deploy'
				]
			},
			{
				Name: 'Assignee',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Note',
				Type: 'Text Editor',
				Length: 0,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Solution',
				Type: 'Text Editor',
				Length: 0,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Solution Attach File',
				Type: 'File',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Reporter',
				Type: 'Text',
				Length: 100,
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '${User.Firstname}'
			},
			{
				Name: 'Issue No',
				Type: 'AutoNumber',
				Length: 0,
				Updatable: 'false',
				Required: 'false',
				Unique: 'true',
				'Default Value': '${yy:Date.Now}${00000:RunningNo.Year.Next}'
			},
			{
				Name: 'Issue Type',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'true',
				Unique: 'false',
				'Default Value': '',
				'List Value': [
					'Bug',
					'Environment',
					'Enquiry',
					'Change',
					'Enhancement',
					'Pen Test',
					'Task',
					'Internal Question',
					'Internal Bug'
				]
			},
			{
				Name: 'Reference Issue',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Solution Image',
				Type: 'Image',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Issue Cause',
				Type: 'Picklist',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': '',
				'List Value': ['UI/UX', 'Logic']
			},
			{
				Name: 'Project Task',
				Type: 'Lookup',
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Dev (Mandays)',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			},
			{
				Name: 'Test (Mandays)',
				Type: 'Decimal',
				Length: 18,
				Updatable: 'true',
				Required: 'false',
				Unique: 'false',
				'Default Value': ''
			}
		],
		Relations: [
			{
				Name: '',
				Type: 'Parent/Child'
			},
			{
				Name: '',
				Type: 'Parent/Child'
			},
			{
				Name: '',
				Type: 'Parent/Child'
			},
			{
				Name: '',
				Type: 'Parent/Child'
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const IssueRecordsOfViewAPI = (reportId) => {
	const json = {
		'Total Records': 6,
		'Report Type': 'Grid View',
		Header: [
			'Issue No',
			'Project',
			'Affects Version',
			'Subject',
			'Priority',
			'Issue Type',
			'Status',
			'Reporter',
			'Assignee',
			'Last Modified Date',
			'Last Modified By'
		],
		Records: [
			{
				id: '3e6b6c84-aebd-4484-b1ac-ba144abfbf8b',
				'Issue No': '210002',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'นำเข้าข้อมูลจ่ายคืนผู้ฝากไม่สำเร็จ',
				Priority: 'High',
				'Issue Type': 'Bug',
				Status: 'In Progress',
				Reporter: "K'มุทิตา",
				Assignee: 'Prachaya Surarak',
				'Last Modified Date': '2021-01-27T19:19:29.61',
				'Last Modified By': 'Sujinda Ponyiam'
			},
			{
				id: 'd1ac7603-4769-49d0-92b0-704d0bf23428',
				'Issue No': '2000395',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'นำเข้าข้อมูลจ่ายคืนผู้ฝากไม่สำเร็จ',
				Priority: 'High',
				'Issue Type': 'Bug',
				Status: 'In Progress',
				Reporter: "K'มุทิตา",
				Assignee: 'Prachaya Surarak',
				'Last Modified Date': '2021-01-18T03:33:30.223',
				'Last Modified By': 'Sujinda Ponyiam'
			},
			{
				id: '7e84e1a5-b48b-4f2c-9559-dc50b33449af',
				'Issue No': '2000394',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'ตั้งค่าระบบใส่ค่าว่างได้',
				Priority: null,
				'Issue Type': 'Bug',
				Status: 'Backlog',
				Reporter: 'Prachaya',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2020-09-10T18:56:51.023',
				'Last Modified By': 'Prachaya Surarak'
			},
			{
				id: '57617c3e-6481-4ce4-b11f-7c44e33a257b',
				'Issue No': '2000393',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: '[ตรวจสอบตัวตน] : ไม่ผ่านการการตรวจสอบตัวตนกรณีที่ไม่ใช่บัตรประชาชน',
				Priority: 'Medium',
				'Issue Type': 'Bug',
				Status: 'Backlog',
				Reporter: 'คุณมุทิตา',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2020-08-25T17:10:17.937',
				'Last Modified By': 'Prachaya Surarak'
			},
			{
				id: '82016e49-3b1e-4551-a747-c6c6e1079423',
				'Issue No': '1902350',
				Project: 'DROS 2',
				'Affects Version': 'uat3',
				Subject:
					'Dashboard รายงานสรุปจำนวนผู้ฝากและจำนวนเงินจ่ายคืนผู้ฝากแบบสะสมแบ่งตามช่องทางการจ่ายเงิน',
				Priority: 'Low',
				'Issue Type': 'Enhancement',
				Status: 'Waiting for Deploy',
				Reporter: 'Duangdao',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2019-10-09T17:40:39.007',
				'Last Modified By': 'Natnaree Pataradool'
			},
			{
				id: 'b4ac3a2e-999b-441c-9900-444be0973777',
				'Issue No': '1902332',
				Project: 'DROS 2',
				'Affects Version': 'uat3',
				Subject: 'Dashboard รายงานสรุปจำนวนผู้ฝากที่มายื่นคำขอแบ่งตามจังหวัด ปรับตามรูป',
				Priority: 'Low',
				'Issue Type': 'Enhancement',
				Status: 'Waiting for Deploy',
				Reporter: 'Duangdao',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2019-10-08T16:37:34.86',
				'Last Modified By': 'Natnaree Pataradool'
			}
		]
	};
	const altJson = {
		'Total Records': 1,
		'Report Type': 'Grid View',
		Header: [
			'Issue No',
			'Affects Version',
			'Subject',
			'Priority',
			'Issue Type',
			'Status',
			'Assignee',
			'Response Date',
			'Created Date'
		],
		Records: [
			{
				id: '221ecdf5-c47e-45d8-b4c4-8f799b3bebb4',
				'Issue No': '2000384',
				'Affects Version': '11',
				Subject: 'Setting Sidebar Grouping - css page section ขนาดถูกลด ไม่เท่า witly.co',
				Priority: null,
				'Issue Type': 'Bug',
				Status: 'Backlog',
				Assignee: 'Sujinda Ponyiam',
				'Response Date': null,
				'Created Date': '2020-06-01T17:47:06.55'
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(
				reportId === 'd5d99338-aed4-4589-b1bb-0e9c0dd6885e'
					? JSON.stringify(json)
					: JSON.stringify(altJson)
			);
		}, 100);
	});
};

export const IssuesRecordsOfListViewAPI = () => {
	const json = {};
	const listJson = {
		'Total Records': 1,
		'Report Type': 'List View',
		Name: '',
		Template: {
			'Description 1': 'Subject',
			'Description 2': 'Project',
			'Description 3': 'Issue Type',
			'Description 4': 'Issue No',
			Image: '',
			'Image Icon': '',
			List: 'Status' //find list from describe
		},
		Records: [
			{
				id: '3e6b6c84-aebd-4484-b1ac-ba144abfbf8b',
				'Issue No': '210002',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'นำเข้าข้อมูลจ่ายคืนผู้ฝากไม่สำเร็จ',
				Priority: 'High',
				'Issue Type': 'Bug',
				Status: 'In Progress',
				Reporter: "K'มุทิตา",
				Assignee: 'Prachaya Surarak',
				'Last Modified Date': '2021-01-27T19:19:29.61',
				'Last Modified By': 'Sujinda Ponyiam'
			},
			{
				id: 'd1ac7603-4769-49d0-92b0-704d0bf23428',
				'Issue No': '2000395',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'นำเข้าข้อมูลจ่ายคืนผู้ฝากไม่สำเร็จ',
				Priority: 'High',
				'Issue Type': 'Bug',
				Status: 'In Progress',
				Reporter: "K'มุทิตา",
				Assignee: 'Prachaya Surarak',
				'Last Modified Date': '2021-01-18T03:33:30.223',
				'Last Modified By': 'Sujinda Ponyiam'
			},
			{
				id: '7e84e1a5-b48b-4f2c-9559-dc50b33449af',
				'Issue No': '2000394',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: 'ตั้งค่าระบบใส่ค่าว่างได้',
				Priority: null,
				'Issue Type': 'Bug',
				Status: 'Backlog',
				Reporter: 'Prachaya',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2020-09-10T18:56:51.023',
				'Last Modified By': 'Prachaya Surarak'
			},
			{
				id: '57617c3e-6481-4ce4-b11f-7c44e33a257b',
				'Issue No': '2000393',
				Project: 'DROS 2',
				'Affects Version': '',
				Subject: '[ตรวจสอบตัวตน] : ไม่ผ่านการการตรวจสอบตัวตนกรณีที่ไม่ใช่บัตรประชาชน',
				Priority: 'Medium',
				'Issue Type': 'Bug',
				Status: 'Backlog',
				Reporter: 'คุณมุทิตา',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2020-08-25T17:10:17.937',
				'Last Modified By': 'Prachaya Surarak'
			},
			{
				id: '82016e49-3b1e-4551-a747-c6c6e1079423',
				'Issue No': '1902350',
				Project: 'DROS 2',
				'Affects Version': 'uat3',
				Subject:
					'Dashboard รายงานสรุปจำนวนผู้ฝากและจำนวนเงินจ่ายคืนผู้ฝากแบบสะสมแบ่งตามช่องทางการจ่ายเงิน',
				Priority: 'Low',
				'Issue Type': 'Enhancement',
				Status: 'Waiting for Deploy',
				Reporter: 'Duangdao',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2019-10-09T17:40:39.007',
				'Last Modified By': 'Natnaree Pataradool'
			},
			{
				id: 'b4ac3a2e-999b-441c-9900-444be0973777',
				'Issue No': '1902332',
				Project: 'DROS 2',
				'Affects Version': 'uat3',
				Subject: 'Dashboard รายงานสรุปจำนวนผู้ฝากที่มายื่นคำขอแบ่งตามจังหวัด ปรับตามรูป',
				Priority: 'Low',
				'Issue Type': 'Enhancement',
				Status: 'Waiting for Deploy',
				Reporter: 'Duangdao',
				Assignee: 'Natnaree Pataradool',
				'Last Modified Date': '2019-10-08T16:37:34.86',
				'Last Modified By': 'Natnaree Pataradool'
			}
		]
	};
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(listJson));
		}, 100);
	});
};

export const IssuesPageLayoutList = (moduleName) => {
	const json = [
		{
			id: '4fba7e74-ea35-4e52-b347-78b33d210215',
			'Page Name': 'Default Detail Layout',
			'Page Type': 'Detail View',
			'Role Name': 'Administrator',
			'First Page': true
		},
		{
			id: '4801bae6-e5aa-4b3a-9b46-ac17b2a46e24',
			'Page Name': 'Custom Edit Layout',
			'Page Type': 'Custom Edit',
			'Role Name': 'Administrator',
			'First Page': true
		},
		{
			id: '4898efb5-6045-4c0f-9232-70bd19f1a2c3',
			'Page Name': 'Default Quick View',
			'Page Type': 'Quick View',
			'Role Name': 'Administrator',
			'First Page': true
		}
	];
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};

export const IssuesModuleDetailAPI = (id) => {
	const json = {
		id: '3e6b6c84-aebd-4484-b1ac-ba144abfbf8b',
		editable: 'true',
		deletable: 'true',
		cloneable: 'true',
		data: [
			{
				'section name': 'Key Information',
				'section type': 'fieldset',
				content: {
					'Issue No': '2100002',
					Assignee: 'Prachaya Surarak',
					Subject: 'นำเข้าข้อมูลจ่ายคืนผู้ฝากไม่สำเร็จ',
					Description: '',
					Priority: 'High',
					Status: 'In Progress',
					'Issue Type': 'Bug',
					'Issue Cause': null,
					Project: 'DROS 2',
					'Affects Version': '',
					'Project Task': '',
					'Dev (Mandays)': null,
					'Test (Mandays)': null
				}
			},
			{
				'section name': 'Issue Information',
				'section type': 'fieldset',
				content: {
					Reporter: "K'มุทิตา",
					'Report Date': '2021-01-26T13:47:31.0000000',
					'Report Channel': 'Other',
					Note: null,
					'Reference Issue': '',
					'Issue Owner': 'Prachaya Surarak',
					'Attach Image1': {
						Name: 'KrhJOLXL_400x400.jpg',
						'Content Type': 'image/jpeg',
						'Storage Id': '3f6bcb3e-1afa-475e-80cb-6d42b2f31e22',
						Url:
							'https://witly.co/secure/res/EASSET/Assets/Field-Images/202101/58d76131-f252-41a4-9dd1-56a74ddb2829.jpg'
					},
					'Attach Image2': null,
					'Attach Image3': null,
					'Attach File': {
						Name: 'Log_นำเข้าข้อมูลรายผู้ฝาก (31).txt',
						'Content Type': 'text/plain',
						'Storage Id': '3ffabe03-e50d-4567-8794-770c03771161',
						Url:
							'https://witly.co/secure/res/EASSET/Assets/Field-Files/202010/cfef742b-b0fd-45bb-b184-7978c939dbe5.txt'
					}
				}
			},
			{
				'section name': 'Dates',
				'section type': 'fieldset',
				content: {
					'Created By': 'Sujinda Ponyiam',
					'Created Date': '2021-01-26T13:47:31.6130000',
					'Last Modified By': 'Sujinda Ponyiam',
					'Last Modified Date': '2021-01-27T12:19:29.6100000'
				}
			},
			{
				'section name': 'Resolution Information',
				'section type': 'fieldset',
				content: {
					Solution: null,
					'Solution Attach File': null,
					'Solution Image': null,
					'Response Date': null,
					'Closed Date': null
				}
			},
			{
				'section name': 'Issue Comments',
				'section type': 'relation',
				creatable: 'true',
				editable: 'true',
				deletable: 'true',
				content: []
			},
			{
				'section name': 'Issue History',
				'section type': 'relation',
				creatable: 'false',
				editable: 'false',
				deletable: 'false',
				content: [
					{
						id: '06c889b3-b09a-4878-b03f-64e97cceb5ea',
						Status: 'In Progress',
						Assignee: 'Prachaya Surarak',
						'Last Modified Date': '2021-01-26T13:47:31.7800000',
						'Last Modified By': 'Sujinda Ponyiam'
					},
					{
						id: 'b73893e3-2a17-459f-9bda-93181f31f0cd',
						Status: 'In Progress',
						Assignee: 'Prachaya Surarak',
						'Last Modified Date': '2021-01-27T12:19:29.9100000',
						'Last Modified By': 'Sujinda Ponyiam'
					}
				]
			}
		]
	};

	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(JSON.stringify(json));
		}, 100);
	});
};
