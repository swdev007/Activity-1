import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthService} from '../../../../../Screens/services/auth.service';
import {useToast} from 'react-native-toast-notifications';
import {ForgotPasswordScreenStyle} from './ForgetPassword.style';
import {useSelector} from 'react-redux';
import CustomButton from '../../../../Components/Buttons/CommonButton/CustomButton';
import CustomInput from '../../../../Components/CustomInput/CustomInput';

const authService = new AuthService();
const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const toast = useToast();
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = ForgotPasswordScreenStyle(AppTheme);

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

  const handleInputChange = (input: string) => {
    setEmail(input);
  };

  return (
    <View style={styles.parentView}>
      <KeyboardAwareScrollView
        style={styles.keyboardView}
        scrollEnabled={isKeyboardVisible}>
        <ImageBackground
          source={AppTheme.icons.loginBackground}
          style={styles.loginBackgroundImage}>
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={AppTheme.icons.splashLogo2}
                style={styles.imageBackgroundCss}
              />
              <Text style={styles.inventoryText}> Swipe </Text>
            </View>
            <View style={styles.loginModal}>
              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}> Forgot password </Text>
              </View>
              <View style={styles.formContainer}>
                <CustomInput
                  label={'Email'}
                  value={email}
                  onChange={handleInputChange}
                  icon={AppTheme.icons.email}
                  error={emailError}
                  placeholder={'Enter email'}
                  hide={false}
                />

                <CustomButton
                  onPress={handleResetPassword}
                  title={'Send Verification code'}
                  backgroundColor={AppTheme.colors.primary}
                  color={AppTheme.colors.white}
                  loading={loading}
                  disable={false}
                />
                <Pressable
                  style={styles.underlineTextContainer}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.forgetText}>Go back to Login</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.bottomLogoContainer}>
          <Image
            source={AppTheme.icons.splashLogo2}
            style={styles.bottomLogo}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgetPasswordScreen;
