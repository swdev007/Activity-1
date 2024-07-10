import {StyleSheet} from 'react-native';
export const BinDetailStyle = StyleSheet.create((AppTheme: any) => {
  return {
    viewCollectionMain: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
      overflow: 'hidden',
    },
    commonButtonWithIcon: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      marginRight: 3,
    },
    bottomTabWrapper: {
      position: 'absolute',
      marginTop: 'auto',
      bottom: -8,
    },
  };
});
