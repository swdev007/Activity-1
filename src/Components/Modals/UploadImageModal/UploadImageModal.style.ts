import {Dimensions, StyleSheet} from 'react-native';
export const UploadImageModalStyle = StyleSheet.create((AppTheme: any) => {
  return {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'transparent',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 40,
      height: Dimensions.get('window').height,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalVisiblebtn: {
      height: 40,
      width: 40,
      borderRadius: 50,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E5E8F5',
      borderColor: '#fff',
      position: 'absolute',
      right: 45,
      top: 20,
    },
    modalButtonContainer: {
      marginTop: 20,
      flexDirection: 'column',
      padding: 10,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalButton1: {
      flexDirection: 'row',
      borderRadius: 10,
      padding: 15,
      elevation: 2,
      marginTop: 20,
      height: 50,
      backgroundColor: '#E5E8F5',
    },
    cameraIcon: {
      height: 15,
      width: 15,
      marginRight: 5,
    },
    buttonText: {
      color: '#1F54FD',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: AppTheme.fonts.Inter,
    },
    modalButton2: {
      borderRadius: 10,
      padding: 15,
      elevation: 2,
      marginTop: 20,
      height: 50,
      width: '46%',
      backgroundColor: '#E5E8F5',
    },
  };
});