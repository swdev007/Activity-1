import {StyleSheet, Platform, Dimensions} from 'react-native';

export const CustomInputStyle = (AppTheme: any) =>
  StyleSheet.create({
    inputInnerContainer: {marginTop: 20, position: 'relative'},
    nameText: {
      fontSize: 14,
      fontWeight: '500',
      fontStyle: 'normal',
      fontFamily: AppTheme.fonts.Inter,
      color: '#232529',
    },
    textInput: {
      height: 48,
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 3,
      paddingLeft: 14,
      color: '#727582',
      borderColor: '#C6C9D7',
    },
    icon: {
      width: 18,
      resizeMode: 'contain',
      position: 'absolute',
      right: 12,
      top: 16,
    },
    error: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: '600',
      color: AppTheme.colors.red,
      marginStart: 16,
      fontFamily: AppTheme.fonts.Inter,
    },
    lockicon: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
    },
    lockicon2: {
      height: 20,
      width: 17,
      resizeMode: 'contain',
    },
  });
