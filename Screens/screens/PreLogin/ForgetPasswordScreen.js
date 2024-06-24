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
import {AuthService} from '../../services/auth.service';
import {useToast} from 'react-native-toast-notifications';

const authService = new AuthService();
const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const toast = useToast();

  const [loading, setLoading] = useState(false);
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
  }, [navigation]);

  const handleResetPassword = async () => {
    if (email.length === 0) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError('');
    }
    try {
      setLoading(true);
      const res = await authService.forgotPassword(email);
      if (res.data.error === true) {
        toast.show(res.data.message, {
          type: 'danger',
          placement: 'top',
        });
        setLoading(false);
      } else {
        toast.show('OTP sent successfully', {
          type: 'success',
          placement: 'top',
        });
        setLoading(false);
        navigation.replace('ConfirmPasswordScreen', {email: email});
      }
    } catch (error) {
      setLoading(false);
      toast.show(error.message, {
        type: 'danger',
        placement: 'top',
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
              <Text style={customcss.inventorytext}> Swipe </Text>
            </View>
            <View style={customcss.Loginmodal}>
              <View style={customcss.logintextcont}>
                <Text style={customcss.logintext}> Forgot password </Text>
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
                <CommonBtn1
                  title={'Send Verification code'}
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

export default ForgetPasswordScreen;
