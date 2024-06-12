import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import customcss from '../assets/customcss';
import {CommonBtn1} from '../Component/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../Component/Colors';
import SafariView from 'react-native-safari-view';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getUniqueId} from 'react-native-device-info';
import {AuthService, LOGIN_URL} from '../../services/auth.service';
import {STORAGE_TYPE} from '../../enums/storage.enums';

const authService = new AuthService();

const LoginScreen = ({navigation}) => {
  useEffect(() => {
    const eventHandler = event => {
      const code =
        (/code=([^&]+)/.test(event.url) &&
          event.url.match(/code=([^&]+)/)[1]) ||
        null;
      if (!code) return;
      Platform.OS === 'ios' && SafariView.dismiss();
      if (
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          code,
        )
      ) {
        getTokenByCode(code);
      }
    };

    const getTokenByCode = async code => {
      try {
        const uniqueId = await getUniqueId();
        const response = await authService.getTokenByCode(code, uniqueId);
        const {access_token, id_token, refresh_token} = response.data.data;
        const userDetails = await authService.getDetails(id_token);
        if (access_token) {
          AsyncStorage.setItem(STORAGE_TYPE.LoginToken, access_token);
          AsyncStorage.setItem(STORAGE_TYPE.RefreshToken, refresh_token);
          AsyncStorage.setItem(STORAGE_TYPE.IdToken, id_token);
          AsyncStorage.setItem(STORAGE_TYPE.UserEmail, userDetails.email);
          navigation.navigate('Homes');
        } else {
          await AsyncStorage.clear();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const listener = Linking.addEventListener('url', eventHandler);
    return () => {
      listener.remove();
    };
  }, [navigation]);

  const pressHandler = useCallback(url => {
    Platform.OS === 'ios'
      ? SafariView.show({
          url,
        })
      : InAppBrowser.open(url, {
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
        });
  }, []);

  const goToForgetPassword = () => {
    navigation.navigate('ForgetPasswordScreen');
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView style={{backgroundColor: Colors.white}}>
        <ImageBackground
          source={require('../Component/Image/loginbackground.png')}
          style={{flex: 1}}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Component/Image/splashlogo2.png')}
                style={customcss.ImageBackgroundcss}
              />
              <Text style={customcss.inventorytext}> Inventory Tracker </Text>
            </View>
            <View style={customcss.Loginmodal}>
              <View style={customcss.logintextcont}>
                <Text style={customcss.logintext}> Login </Text>
              </View>
              <View style={{marginStart: 21, marginEnd: 21, marginTop: 15}}>
                <CommonBtn1
                  title={'Login'}
                  onPress={() => pressHandler(LOGIN_URL)}
                  color={'#fff'}
                />
                <Pressable
                  style={{alignItems: 'center', marginBottom: 40}}
                  onPress={goToForgetPassword}>
                  <Text style={customcss.forgettext}>
                    Forgot username or password?
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? 100 : 20,
            marginBottom: 26,
            alignItems: 'center',
          }}>
          <Image
            source={require('../Component/Image/splashlogo2.png')}
            style={{height: 38, width: '50%', resizeMode: 'contain'}}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
