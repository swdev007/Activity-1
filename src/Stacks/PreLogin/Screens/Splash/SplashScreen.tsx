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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonBtn} from '../../../../../Screens/screens/Component/Helper';
import {
  AuthService,
  LOGOUT_URL,
} from '../../../../../Screens/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafariView from 'react-native-safari-view';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getUniqueId} from 'react-native-device-info';
import {STORAGE_TYPE} from '../../../../../Screens/enums/storage.enums';
import {useToast} from 'react-native-toast-notifications';

import {SplashScreenStyle} from './SplashScreen.style';
import {useSelector} from 'react-redux';
const authService = new AuthService();

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {AppTheme} = useSelector((store: any) => store.theme);

  const styles = SplashScreenStyle(AppTheme);

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

    const listener = Linking.addEventListener('url', eventHandler);
    return () => {
      listener.remove();
    };
  }, [navigation, toast]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          animating={true}
          color={AppTheme.colors.mainColor}
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.splashContainer}>
      <View style={styles.imageBackgroundWrapper}>
        <ImageBackground
          source={AppTheme.icons.splashBackground}
          style={styles.imageBackground}>
          <View style={styles.imageView}>
            <Image
              source={AppTheme.icons.splashLogo2}
              style={styles.imageBackgroundCss}
            />
            <Text style={styles.inventoryText}>
              Search Warrant Inventory Processing of Evidence
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.imageButtonWrapper}>
        <Image source={AppTheme.icons.splash} style={styles.splashImage} />
        <CommonBtn
          title={'Login to SWIPE'}
          onPress={handleLogin}
          backgroundColor={'#0F48FF'}
          color={'#fff'}
          loading={loading}
        />

        <Pressable style={styles.forgotPassword} onPress={goToForgetPassword}>
          <Text style={styles.forgetText}>Forgot password?</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.nameText}>Copyright 2024 (C) Eklipse AI LLC</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
