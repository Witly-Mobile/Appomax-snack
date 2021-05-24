export function GetValueFromObject(object, displayName, variableName) {
	if (!object || (!displayName && !variableName)) {
		return '';
	}

	//find by display name
	if (displayName in object) {
		return object[displayName];
	} else if (variableName in object) {
		return object[variableName];
	} else {
		return null;
	}
}

export function RemoveDuplicateArray(originArray) {
	const uniqueArray =
		originArray?.length === undefined
			? []
			: originArray.filter((element, index) => {
					const _element = JSON.stringify(element);
					return (
						index ===
						originArray.findIndex((obj) => {
							return JSON.stringify(obj) === _element;
						})
					);
			  });
	return uniqueArray;
}
