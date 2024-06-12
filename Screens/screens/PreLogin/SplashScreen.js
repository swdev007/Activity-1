import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import customcss from '../assets/customcss';
import {CommonBtn} from '../Component/Helper';

import {AuthService} from '../../services/auth.service';

const authService = new AuthService();

const SplashScreen = () => {
  const navigation = useNavigation();
  const handleLogin = async () => {
    const isTokenExpired = await authService.isTokenExpired();
    if (isTokenExpired) {
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('Homes');
    }
  };

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
            <Text style={customcss.inventorytext}> Inventory Tracker </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{alignItems: 'center', marginTop: -100}}>
        <Image
          source={require('../Component/Image/splashlogo.png')}
          style={{height: 200, width: '40%', resizeMode: 'contain'}}
        />
        <CommonBtn
          title={'Inventory Tracker'}
          onPress={() => handleLogin()}
          // onPress={() => navigation.navigate('LoginScreen')}
          backgroundColor={'#0F48FF'}
          color={'#fff'}
        />
      </View>
      <View style={{marginTop: 'auto', marginBottom: 26, alignItems: 'center'}}>
        <Image
          source={require('../Component/Image/splashlogo2.png')}
          style={{height: 38, width: '50%', resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
