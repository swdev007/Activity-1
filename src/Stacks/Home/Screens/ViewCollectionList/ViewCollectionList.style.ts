import {StyleSheet} from 'react-native';
export const ViewCollectionListStyle = (AppTheme: any) =>
  StyleSheet.create({
    viewCollectionMain: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
    },
    btnWrapper: {
      marginTop: 20,
      marginBottom: 20,
    },
    viewWarrantButton: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      marginRight: 3,
    },
  });
