import {StyleSheet, Platform} from 'react-native';

export const ForgotPasswordScreenStyle = (AppTheme: any) =>
  StyleSheet.create({
    parentView: {flex: 1},
    keyboardView: {backgroundColor: AppTheme.colors.white},
    logoContainer: {alignItems: 'center'},
    imageBackgroundCss: {
      height: 68,
      width: '50%',
      resizeMode: 'contain',
      marginTop: 60,
    },
    inventoryText: {
      color: '#141F42',
      fontSize: 20,
      fontWeight: '600',
      marginTop: 41,
      fontFamily: AppTheme.fonts.Inter,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    loginModal: {
      marginStart: 20,
      marginEnd: 20,
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: '#FFF',
      elevation: 20,
      shadowColor: Platform.OS == 'android' ? 'gray' : 'rgba(0, 0, 0, 0.13)',
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 10,
      shadowOpacity: 0.8,
    },
    loginTextContainer: {
      marginTop: 27,
      alignItems: 'center',
    },
    loginText: {
      fontSize: 25,
      fontStyle: 'normal',
      fontWeight: '700',
      color: '#1F54FD',
      fontFamily: AppTheme.fonts.Inter,
    },

    forgetText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      color: '#232529',
      textTransform: 'capitalize',
      lineHeight: 22,
      fontStyle: 'normal',
      textDecorationLine: 'underline',
      textDecorationColor: '#000',
    },

    bottomLogoContainer: {
      marginTop: Platform.OS == 'ios' ? 100 : 20,
      marginBottom: 26,
      alignItems: 'center',
    },
    bottomLogo: {height: 38, width: '50%', resizeMode: 'contain'},
    underlineTextContainer: {alignItems: 'center', marginBottom: 40},
    loginBackgroundImage: {
      flex: 1,
    },
    formContainer: {marginStart: 21, marginEnd: 21, marginTop: 15},
  });
