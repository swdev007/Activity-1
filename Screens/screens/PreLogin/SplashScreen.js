import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Platform,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import customcss from '../assets/customcss';
import {CommonBtn} from '../Component/Helper';
import {AuthService, LOGOUT_URL} from '../../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafariView from 'react-native-safari-view';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getUniqueId} from 'react-native-device-info';
import {STORAGE_TYPE} from '../../enums/storage.enums';
import {useToast} from 'react-native-toast-notifications';
import {Colors} from '../Component/Colors';

const authService = new AuthService();

const SplashScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const uniqueId = await getUniqueId();
        const response = await authService.getTokenByCode(code, uniqueId);
        const {access_token, id_token, refresh_token} = response.data.data;
        const userDetails = await authService.getDetails(id_token);
        if (access_token) {
          AsyncStorage.setItem(STORAGE_TYPE.LoginToken, access_token);
          AsyncStorage.setItem(STORAGE_TYPE.RefreshToken, refresh_token);
          AsyncStorage.setItem(STORAGE_TYPE.IdToken, id_token);
          AsyncStorage.setItem(STORAGE_TYPE.UserEmail, userDetails.email);
          try {
            await authService.updateDeviceId(uniqueId, access_token);
          } catch (error) {}
          navigation.navigate('Homes');
        } else {
          await AsyncStorage.clear();
        }
      } catch (error) {
        console.log(error);
        toast.show(error.message, {
          type: 'danger',
          placement: 'top',
        });
      } finally {
        setLoading(false);
      }
    };

    const listener = Linking.addEventListener('url', eventHandler);
    return () => {
      listener.remove();
    };
  }, [navigation, toast]);

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

  const handleLogin = async () => {
    setLoading(true);
    const isTokenExpired = await authService.isTokenExpired();
    setLoading(false);
    if (isTokenExpired) {
      pressHandler(LOGOUT_URL);
    } else {
      navigation.navigate('Homes');
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: 'trasnsparent',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <ActivityIndicator
          animating={true}
          color={Colors.mainColor}
          type="large"
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{height: '50%'}}>
        <ImageBackground
          source={require('../Component/Image/splashbackground.png')}
          style={{height: '100%', width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../Component/Image/splashlogo2.png')}
              style={customcss.ImageBackgroundcss}
            />
            <Text style={customcss.inventorytext}>
              Search Warrant Inventory Processing of Evidence
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{alignItems: 'center', marginTop: -100}}>
        <Image
          source={require('../Component/Image/splash.png')}
          style={{height: 200, width: '40%', resizeMode: 'contain'}}
        />
        <CommonBtn
          title={'Login to SWIPE'}
          onPress={handleLogin}
          backgroundColor={'#0F48FF'}
          color={'#fff'}
          loading={loading}
        />

        <Pressable
          style={{alignItems: 'center', marginBottom: 40}}
          onPress={goToForgetPassword}>
          <Text style={customcss.forgettext}>Forgot password?</Text>
        </Pressable>
      </View>
      <View style={{marginTop: 'auto', marginBottom: 26, alignItems: 'center'}}>
        <Text style={customcss.nametext}>
          Copyright 2024 (C) Eklipse AI LLC
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
