import {StyleSheet} from 'react-native';
export const BinItemDetailStyle = StyleSheet.create((AppTheme: any) => {
  return {
    viewCollectionMain: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
      overflow: 'hidden',
    },
    eyeIcon: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      marginRight: 3,
    },
    root: {flex: 1, backgroundColor: '#fff'},
  };
});
