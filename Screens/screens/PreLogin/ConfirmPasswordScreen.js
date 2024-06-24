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
import {CommonBtn1} from '../Component/Helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../Component/Colors';
import {useTogglePasswordVisibility} from './useTogglePasswordVisibility';
import {AuthService} from '../../services/auth.service';
import {useToast} from 'react-native-toast-notifications';

const authService = new AuthService();
const ConfirmPasswordScreen = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const toast = useToast();

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
  }, [navigation]);

  const handleResetPassword = async () => {
    if (password.length === 0) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    if (!authService.checkIfItIsAValidPassword(password)) {
      setPasswordError('Password is not valid');
      return;
    }

    if (code.length === 0) {
      setCodeError('Code is required');
    } else {
      setCodeError('');
    }

    if (code.length === 0 || password.length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.confirmPassword(
        code,
        password,
        route.params.email,
      );
      if (response.data.error === false) {
        toast.show(response.data.message, {
          type: 'success',
          placement: 'top',
        });
        setLoading(false);
        navigation.goBack();
      } else {
        toast.show(response.data.message, {
          type: 'danger',
          placement: 'top',
        });
        setLoading(false);
      }
    } catch (error) {
      toast.show(error.message, {
        type: 'danger',
        placement: 'top',
      });
      setLoading(false);
    }
  };

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

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
              <Text style={customcss.inventorytext}> Swipe </Text>
            </View>
            <View style={customcss.Loginmodal}>
              <View style={customcss.logintextcont}>
                <Text style={customcss.logintext}> Forgot password </Text>
              </View>

              <View style={{marginStart: 21, marginEnd: 21, marginTop: 15}}>
                <View style={{marginTop: 20}}>
                  <Text style={customcss.nametext}>Code</Text>
                  <TextInput
                    style={customcss.textinput}
                    placeholder="Enter Code"
                    placeholderTextColor={'#727582'}
                    value={code}
                    onChangeText={text => setCode(text)}
                    maxLength={30}
                  />
                </View>

                {codeError.length > 0 && (
                  <Text style={customcss.error}>{codeError}</Text>
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
                  title={'Reset password'}
                  onPress={handleResetPassword}
                  color={'#fff'}
                  loading={loading}
                />
                <Pressable
                  style={{alignItems: 'center', marginBottom: 40}}
                  onPress={() => navigation.goBack()}>
                  <Text style={customcss.forgettext}>Go back to Login</Text>
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

export default ConfirmPasswordScreen;
