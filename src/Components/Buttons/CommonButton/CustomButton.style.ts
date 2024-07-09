import {StyleSheet, Platform, Dimensions} from 'react-native';

export const CustomButtonStyle = (AppTheme: any) =>
  StyleSheet.create({
    btnContainer: {
      borderRadius: 8,
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      alignSelf: 'center',
      marginTop: 20,
      width: Dimensions.get('window').width / 1.2,
    },
    btnText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      lineHeight: 22,
    },
  });
