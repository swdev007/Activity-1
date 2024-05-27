import {
  ImageBackground,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import customcss from '../assets/customcss';
import {CommonBtn1, screenHeight} from '../Component/Helper';
import {useTogglePasswordVisibility} from './useTogglePasswordVisibility';
import VectorIcon from '../Component/vectorIcons';
import axios from 'axios';
import {login} from '../Component/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../Component/Colors';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const HandleLogin = () => {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError('Email is required');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      console.log('hello world', email, password);
      setLoading(true);
      axios
        .post(login, {
          username: email,
          password: password,
        })
        .then(function (response) {
          try {
            console.log('response of login api', response.data);
            if (response.data.error == false) {
              AsyncStorage.setItem(
                'LoginToken',
                response?.data?.data?.AuthenticationResult?.AccessToken,
              );
              AsyncStorage.setItem('UserEmail', email);
              navigation.navigate('Homes');
              setLoading(false);
            } else {
              setEmailError(response?.data?.message);
              setLoading(false);
            }
          } catch (error) {
            console.log(error.response);
            setLoading(false);
          }
          setEmail('');
          setPassword('');
        })
        .catch(function (error) {
          console.log(error.response);
          setLoading(false);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        style={{backgroundColor: Colors.white}}
        scrollEnabled={isKeyboardVisible}>
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
                <View style={{marginTop: 20}}>
                  <Text style={customcss.nametext}> Email </Text>
                  <TextInput
                    style={customcss.textinput}
                    placeholder="Enter email"
                    placeholderTextColor={'#727582'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    maxLength={30}
                  />
                  <Image
                    source={require('../Component/Image/email.png')}
                    style={{
                      height: 14,
                      width: 18,
                      resizeMode: 'contain',
                      position: 'absolute',
                      right: 12,
                      top: 40,
                    }}
                  />
                </View>
                {emailError.length > 0 && (
                  <Text style={customcss.error}>{emailError}</Text>
                )}
                <View style={{marginTop: 20}}>
                  <Text style={customcss.nametext}> Password </Text>
                  <TextInput
                    style={customcss.textinput}
                    placeholder="Enter password"
                    placeholderTextColor={'#727582'}
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    maxLength={30}
                  />
                  <Pressable
                    style={{
                      width: 45,
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      top: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={handlePasswordVisibility}>
                    {rightIcon === 'lock' ? (
                      <Image
                        source={require('../Component/Image/lock.png')}
                        style={customcss.lockicon}
                      />
                    ) : (
                      <Image
                        source={require('../Component/Image/lock2.png')}
                        style={customcss.lockicon}
                      />
                    )}
                  </Pressable>
                </View>
                {passwordError.length > 0 && (
                  <Text style={customcss.error}>{passwordError}</Text>
                )}
                <CommonBtn1
                  title={'Login'}
                  onPress={() => HandleLogin()}
                  color={'#fff'}
                  loading={loading}
                />
                <View style={{alignItems: 'center', marginBottom: 40}}>
                  <Text style={customcss.forgettext}>
                    Forgot username or password?
                  </Text>
                </View>
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
