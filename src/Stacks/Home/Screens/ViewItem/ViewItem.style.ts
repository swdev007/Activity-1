import {StyleSheet} from 'react-native';
export const ViewItemStyle = StyleSheet.create((AppTheme: any) => {
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
    buttonConatiner: {
      marginTop: 20,
    },
    camerWithIconButtonIcon: {
      height: 17,
      width: 17,
      resizeMode: 'contain',
      marginRight: 4,
    },
    bottomTabContainer: {
      position: 'absolute',
      marginTop: 'auto',
      bottom: 0,
    },
  };
});
