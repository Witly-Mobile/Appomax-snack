export function IsTokenExpired(TokenExpiryDate) {
	let now = new Date();
	let expiryDate = new Date(TokenExpiryDate);
	return now >= expiryDate;
}
