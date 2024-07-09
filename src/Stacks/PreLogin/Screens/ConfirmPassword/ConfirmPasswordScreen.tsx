import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import {useEffect, useState} from 'react';
import CustomButton from '../../../../Components/Buttons/CommonButton/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTogglePasswordVisibility} from '../../../../../Screens/screens/PreLogin/useTogglePasswordVisibility';
import {useToast} from 'react-native-toast-notifications';
import {ConfirmPasswordScreenStyle} from './ConfirmPassword.style';
import {useSelector} from 'react-redux';
import CustomInput from '../../../../Components/CustomInput/CustomInput';
import {AuthService} from '../../../../Services/Auth/auth.service';

const authService = new AuthService();
const ConfirmPasswordScreen = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const toast = useToast();
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = ConfirmPasswordScreenStyle(AppTheme);

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
        style={styles.keyboardView}
        scrollEnabled={isKeyboardVisible}>
        <ImageBackground
          source={AppTheme.icons.loginBackground}
          style={styles.imageBackground}>
          <View>
            <View style={styles.logoTextWrapper}>
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

              <View style={styles.inputContainer}>
                <CustomInput
                  label={'Code'}
                  value={code}
                  onChange={(text: string) => setCode(text)}
                  icon={undefined}
                  error={codeError}
                  placeholder={'Enter Code'}
                />
                <CustomInput
                  label={'Password'}
                  value={password}
                  onChange={(text: string) => setPassword(text)}
                  icon={undefined}
                  error={passwordError}
                  placeholder={'Enter password'}
                  hide={true}
                />

                <CustomButton
                  onPress={handleResetPassword}
                  title={'Reset password'}
                  loading={loading}
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

export default ConfirmPasswordScreen;
