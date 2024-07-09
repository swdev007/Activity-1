import {StyleSheet} from 'react-native';
export const CommonButtonStyle = StyleSheet.create((AppTheme: any) => {
  return {
    btnContainer: {
      borderRadius: 5,
      height: 48,
      backgroundColor: '#E5E8F5',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    btnWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnWithIconText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      lineHeight: 22,
      textTransform: 'capitalize',
      color: '#1F54FD',
    },
  };
});
