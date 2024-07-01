// const baseurl = 'http://192.168.0.71:8666/api/';
const baseurl = 'http://3.236.161.85/api/';

export const login = baseurl + 'login'; //body => username, password
export const logout = baseurl + 'logout'; //body=>AccessToken
export const GetCollectionList = baseurl + 'GetCollectionList'; // body=> AccessToken
export const GetCollectionDetails = baseurl + 'GetCollectionDetails'; //body=> collectionId
export const updateCollection = baseurl + 'updateCollection'; // body => collectionId, description, location, status
export const GetBinList = baseurl + 'GetBinList'; //body=> collectionId
export const GetBinDetails = baseurl + 'GetBinDetails'; //body=> binId
export const updateBin = baseurl + 'updateBin'; // body=> binId, description, location
export const AddItem = baseurl + 'AddItem'; //body=> binId, name, image_url, description, location
export const updateItem = baseurl + 'updateItem'; //body=> itemId, name, image_url, description, location
export const DeleteItem = baseurl + 'DeleteItem'; //body=> itemId
export const GetItemList = baseurl + 'GetItemList'; //body=> binId
export const GetItemDetails = baseurl + 'GetItemDetails'; //body=> itemId
export const TokenByCode = baseurl + 'GetTokenByCode'; // body=> code, uniqueCode
export const RefreshToken = baseurl + 'RefreshToken'; // body=> refresh_token
export const ForgotPassword = baseurl + 'forgotPassword'; // body => email
export const ResetPassword = baseurl + 'resetPassword'; // body=> email, password, otp
export const UpdateDevice = baseurl + 'UpdateDevice'; // body => deviceId
export const ResetPasswordLoggedIn = baseurl + 'ResetPasswordLoggedIn';
