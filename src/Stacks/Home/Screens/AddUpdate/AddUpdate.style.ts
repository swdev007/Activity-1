import {StoreInterface} from '../../../../Redux/Store';
import {StyleSheet} from 'react-native';
import {ThemeState} from '../../../../Redux/Slices/Theme.slice';
export const AddUpdateStyle = StyleSheet.create((AppTheme: any) => {
  return {
    viewCollectionMain: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
      overflow: 'hidden',
    },
    editCollectionContainer: {
      minHeight: 100,
      borderRadius: 15,
      backgroundColor: '#F4F4F4',
      borderWidth: 1,
      borderColor: '#FFF',
      marginBottom: 20,
    },
    collectionTextContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    collectionImageContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    collectionImage: {
      height: 15,
      width: 15,

      alignItems: 'center',
    },
    collectionText: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      marginLeft: 4,
      color: '#141F42',
      width: 83,
    },
    collectionIdContainer: {
      marginLeft: 12,
      justifyContent: 'center',
    },
    collectionId: {
      fontSize: 15,
      fontWeight: '500',
      fontFamily: AppTheme.fonts.Inter,
      color: '#727582',
      alignSelf: 'flex-start',
    },
    collectionIdText: {
      fontSize: 12,
      fontWeight: '500',
      fontFamily: AppTheme.fonts.Inter,
      color: '#727582',
      alignSelf: 'flex-start',
      width: 173,
    },

    collectionIdTextConatiner: {
      marginLeft: 12,
      justifyContent: 'center',
    },
    commonBtnWithIcon: {
      height: 35,
      width: 35,
      resizeMode: 'contain',
      borderRadius: 35 / 2,
      marginRight: 5,
    },
    collectionTextContainer2: {
      marginTop: 30,
      flexDirection: 'row',
    },
    locationImage: {
      height: 18,
      width: 18,
      resizeMode: 'contain',
      alignItems: 'center',
    },
    audioContainer: {
      height: 31,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#fff',
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 8,
      marginTop: 6,
      width: 80,
    },
    audioImage: {height: 14, width: 14},
    audioText: {
      fontSize: 13,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: '500',
      color: '#727582',
      lineHeight: 16,
    },
    locationInputConatiner: {marginTop: -12, marginLeft: 12},
    descriptionTextInput12: {
      overflow: 'hidden',
      height: 70,
      borderWidth: 1,
      borderColor: '#C6C9D7',
      borderRadius: 5,
      backgroundColor: '#fff',
      width: 190,
      padding: 9,
      fontSize: 12,
      color: '#727582',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      marginBottom: 11,
    },
    buttonConatiner: {
      flexDirection: 'row',
      marginTop: -10,
    },
    bottomTabContainer: {
      position: 'absolute',
      marginTop: 'auto',
      bottom: -10,
    },
    infoImageConatiner: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  };
});
