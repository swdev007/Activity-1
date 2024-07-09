import {StyleSheet} from 'react-native';
export const ViewCollectionStyle = StyleSheet.create((AppTheme: any) => {
  return {
    root: {flex: 1, backgroundColor: '#fff'},
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
    lockIcon: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      marginRight: 3,
    },
    bottomWrapper: {position: 'absolute', marginTop: 'auto', bottom: -8},
    buttonWrapper: {marginTop: 15},
  };
});
