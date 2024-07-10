import {Dimensions, StyleSheet} from 'react-native';
export const BottomTabStyle = StyleSheet.create((AppTheme: any) => {
  return {
    root: {
      backgroundColor: 'transparent',
      width: Dimensions.get('window').width,
      height: 80,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginStart: 30,
      marginEnd: 35,
      justifyContent: 'space-between',
    },
    buttonWrap: {
      justifyContent: 'center',
      bottom: 18,
    },
    profileTabContainer: {
      height: 55,
      width: 55,
      borderRadius: 55 / 2,
      backgroundColor: '#0F48FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileTab: {
      height: 27,
      width: 27,
      resizeMode: 'contain',
      marginTop: 8,
    },
    text1: {
      marginTop: 8,
      fontSize: 14,
      fontWeight: '500',
      fontFamily: AppTheme.fonts.Inter,
      color: '#232529',
      textAlign: 'center',
    },
    helpTab: {
      height: 23,
      width: 16,
      marginTop: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});
