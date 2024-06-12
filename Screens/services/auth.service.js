import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {RefreshToken, TokenByCode} from '../screens/Component/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_TYPE} from '../enums/storage.enums';

export const CLIENT_ID = '29vqv28ta310uqd3q0ug7kkavk';
export const LOGIN_URL = `https://dev-swipelogin.eklipseai.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=pwa://`;
export const LOGOUT_URL = `https://dev-swipelogin.eklipseai.com/logout?client_id=${CLIENT_ID}&logout_uri=pwa://`;

export class AuthService {
  async isTokenExpired() {
    const token = await AsyncStorage.getItem(STORAGE_TYPE.LoginToken);
    const refreshToken = await AsyncStorage.getItem(STORAGE_TYPE.RefreshToken);

    if (!token && !refreshToken) {
      return true;
    }

    if (!this.checkIfTokenIsInValid(token)) {
      return true;
    }

    if (!refreshToken) {
      return true;
    }

    try {
      const res = await this.getTokenByRefresh(refreshToken);
      const {access_token, id_token} = res.data.data;
      const userDetails = await this.getDetails(id_token);
      AsyncStorage.setItem(STORAGE_TYPE.LoginToken, access_token);
      AsyncStorage.setItem(STORAGE_TYPE.RefreshToken, refreshToken);
      AsyncStorage.setItem(STORAGE_TYPE.IdToken, id_token);
      AsyncStorage.setItem(STORAGE_TYPE.UserEmail, userDetails.email);
      return false;
    } catch (error) {
      AsyncStorage.clear();
      return true;
    }
  }

  getDetails(id_token) {
    if (!id_token) {
      return null;
    }
    try {
      const decodedToken = jwtDecode(id_token);
      const {email, given_name} = decodedToken;
      return {
        email: email,
        username: decodedToken['cognito:username'],
        given_name: given_name,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  getTokenByCode(code, uniqueId) {
    return axios.post(TokenByCode, {
      code,
      uniqueId,
    });
  }

  getTokenByRefresh(refresh_token) {
    return axios.post(RefreshToken, {
      refresh_token,
    });
  }

  async checkIfTokenIsInValid(token) {
    if (!token) {
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}
