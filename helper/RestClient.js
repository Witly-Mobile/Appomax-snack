import * as React from 'react';
import axios from 'axios';
import { BASE_URL } from './../constants/Globals';
import AuthContext from '../context/AuthContext';
import { showMessage, hideMessage } from 'react-native-flash-message';

let source = axios.CancelToken.source();

export const RestClient = () => {
	return CreateRestClientInstance();
};

function CreateRestClientInstance() {
	const client = axios.create({
		baseURL: BASE_URL,
		timeout: 1500,
		cancelToken: source.token
	});

	client.interceptors.request.use(
		(config) => {
			// Do something before request is sent
			//console.info('[Rest client] client.interceptors.request config:', config);
			return config;
		},
		(error) => {
			// Do something with request error
			//console.log('[Rest client] client.interceptors.request error:', error);
			return Promise.reject(error);
		}
	);

	return client;
}

export function HandleErrorMsg(Errors) {
	if (Errors?.length) {
		return Errors.map((err) => `[${err.Code}:${err.Message}]`).join();
	} else {
		return '';
	}
}

export function WithAxios({ children }) {
	const { RestClientInstance, logOut } = React.useContext(AuthContext);

	RestClientInstance()?.interceptors?.response.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			//console.log('[WithAxios] client.interceptors.response response:', response?.data);
			return response;
		},
		(error) => {
			if (typeof error === 'object') {
				if (error?.response.status === 403) {
					console.log('[WithAxios] client.interceptors.response 403 error:', error);
					showMessage({
						message: 'User Token is expired. Please logging in.',
						type: 'danger'
					});
					//source.cancel('Cancel all requests because 403');
					logOut();
				}
				/* else {
					console.log(error);
					showMessage({
						message: 'Connecting failed.',
						type: 'danger'
					});
				} */
			} else {
				showMessage({
					message: error,
					type: 'danger'
				});
			}
			return Promise.reject(error);
		}
	);

	return children;
}
