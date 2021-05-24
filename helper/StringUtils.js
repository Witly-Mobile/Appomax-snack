/* eslint-disable prettier/prettier */
import validator from 'validator';
import { HOST } from '../constants/Globals';

export const ConvertApiName = (moduleName) => {
	if (moduleName === undefined) {
		return '';
	}
	return moduleName.trim().toLocaleLowerCase().replace(/\s+/g, '-');
};

export const ConvertDisplayName = (moduleName) => {
	if (moduleName === undefined) {
		return '';
	}
	let words = moduleName.trim().replace('-/g', ' ').split(' ');
	return words.map(([firstLetter, ...restOfWord]) => firstLetter.toUpperCase() + restOfWord.join('')).join(' ');
};

export const ConvertToVariableName = (OldString) => {
	if (OldString === undefined) {
		return '';
	}
	return OldString.trim().replace(/\s+/g, '');
};

export const CompareString = (first, second) => {
	//normalize string
	let firstStr = first && typeof first === 'string' ? first.trim().replace(/\s+/g, '-') : '';
	let secondStr = second && typeof second === 'string' ? second.trim().replace(/\s+/g, '-') : '';
	return firstStr.localeCompare(secondStr);
};

/* export function validURI(str) {
	return validator.isURL(str);
} */

export function validURI(str){
	let regex = '^(http(s)?:\/\/)(www\.)?[(a-zA-Z0-9@:%._\+~#=){2,256}]+([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
	var pattern = new RegExp(regex,'i');
	return !!pattern.test(str);
}

export function ExtractFileNameFromURI(uri) {
	if (validURI(uri)) {
		return uri.substring(uri.lastIndexOf('/') + 1);
	}
	return '';
}

export function isObjectEmpty(obj) {
	return obj === null ? true : (typeof obj === 'object' ? Object.getOwnPropertyNames(obj).length <= 0 : true);
}

export function IsEmptyOrNullOrUndefined(value) {
	return value === '' || value === null || value === undefined;
}

export function BuildImageSource(imageUri){
	if (IsEmptyOrNullOrUndefined(imageUri)){
		return {};
	}

	if (validURI(imageUri)) {
		//internet
		if (__DEV__) {
			// do dev stuff
			return {uri: imageUri.replace('http://localhost:8181', HOST)};
		  } else {
			  //production
			  return {uri: imageUri};
		  }
	} else {
		//Maybe, receive from camera
		return {uri: imageUri};
	}
}

export function ValidTimestampFormat(value){
	if (!isNaN(new Date(value)) && [10, 13].includes(value)) {
		return true;
	}

	return false;
}
