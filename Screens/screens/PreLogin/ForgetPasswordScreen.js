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

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
    var emailValid = false;
    if (email.length === 0) {
      setEmailError('Email is required');
    } else {
      setEmailError('');
      emailValid = true;
    }

    if (emailValid) {
      navigation.replace('ConfirmPasswordScreen', {email: email});
      return;
    }
    // TODO: NEED TO IMPLEMENT API
    //   setLoading(true);

    //   const response = await axios.post(login, {
    //     username: email,
    //   });

    //   try {
    //     if (response.data.error === false) {
    //       setLoading(false);

    //       navigation.replace('ConfirmPasswordScreen', {email: email});
    //     } else {
    //       setEmailError(response?.data?.message);
    //       setLoading(false);
    //     }
    //   } catch (error) {
    //     console.log(error.response);
    //     setLoading(false);
    //   }
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
