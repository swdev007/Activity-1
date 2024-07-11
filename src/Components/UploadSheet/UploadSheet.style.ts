import {Dimensions, StyleSheet} from 'react-native';
export const UploadSheetStyle = StyleSheet.create((AppTheme: any) => {
  return {
    btnOption: {
      height: 52,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      borderBottomColor: '#0F48FF',
    },
    optionSub: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 15,
      marginVertical: 12,
    },
    optionText: {
      fontSize: 20,
      fontFamily: AppTheme.fonts.Inter,
      marginLeft: 10,
      color: '#727582',
      fontWeight: '500',
    },
  };
});
