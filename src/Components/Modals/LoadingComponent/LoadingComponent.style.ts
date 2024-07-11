import {StyleSheet} from 'react-native';
export const LoadingComponentStyle = StyleSheet.create((AppTheme: any) => {
  return {
    loaderContainer: {
      width: 200,
      height: 200,
      backgroundColor: 'trasnsparent',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
  };
});
