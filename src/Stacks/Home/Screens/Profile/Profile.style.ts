import {StyleSheet} from 'react-native';
export const ProfileStyle = StyleSheet.create((AppTheme: any) => {
  return {
    viewCollectionMain: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
      overflow: 'hidden',
    },
    editCollectionContainer22: {
      minHeight: 100,
      borderRadius: 15,
      backgroundColor: '#F4F4F4',
      borderWidth: 1,
      borderColor: '#FFF',
      paddingRight: 20,
      paddingLeft: 18,
      marginTop: 14,
    },
    changePassword: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      color: '#232529',
    },
    nameText: {
      fontSize: 14,
      fontWeight: '500',
      fontStyle: 'normal',
      fontFamily: AppTheme.fonts.Inter,
      color: '#232529',
    },
    textInput: {
      height: 48,
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 3,
      paddingLeft: 14,
      color: '#727582',
      borderColor: '#C6C9D7',
    },
    lockIcon: {
      height: 24,
      width: 24,
    },
    infoContainer: {
      marginTop: 15,
    },
    contactText: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      color: '#141F42',
      fontWeight: '600',
    },
    information: {
      marginTop: 10,
      marginBottom: 10,
    },
    informationTextContainer: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    profile: {
      height: 20,
      width: 16,
    },
    mobile: {
      height: 20,
      width: 16,
    },

    emailText: {
      fontSize: 13,
      fontWeight: '500',
      fontFamily: AppTheme.fonts.Inter,
      color: '#727582',
      marginLeft: 8.25,
    },
    emailIcon: {
      height: 14,
      width: 18,
      resizeMode: 'contain',
    },
    lockIcon2: {
      height: 20,
      width: 17,
      resizeMode: 'contain',
    },
    mobileIcon: {
      height: 20,
      width: 16,
    },
    inputContainer: {marginTop: 20},
    buttonContainer: {marginTop: 20, marginBottom: 20},
  };
});
