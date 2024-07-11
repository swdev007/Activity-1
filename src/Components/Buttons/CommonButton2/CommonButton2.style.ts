import {Dimensions, StyleSheet} from 'react-native';
export const CommonButton2Style = StyleSheet.create((AppTheme: any) => {
  const screenWidth = Dimensions.get('window').width;
  return {
    btnSub: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnContainer: {
      borderRadius: 8,
      height: 54,
      backgroundColor: '#1F54FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      alignSelf: 'center',
      marginTop: 20,
      width: screenWidth / 1.27,
    },

    btnText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      lineHeight: 22,
    },
  };
});
