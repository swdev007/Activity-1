import {StyleSheet} from 'react-native';
export const CollectionDetailsStyle = StyleSheet.create((AppTheme: any) => {
  return {
    collectionConainer: {
      minHeight: 100,
      borderRadius: 15,
      backgroundColor: '#F4F4F4',
      borderWidth: 1,
      borderColor: '#FFF',
      paddingRight: 20,
      paddingLeft: 25,
      paddingBottom: 23,
    },

    collectionTextContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    collectionImageContainer: {
      marginTop: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 'auto',
      flexDirection: 'row',
      width: '100%',
    },
    collectionImage: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
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
    collectionInputImage: {
      height: 70,
      width: 70,
      // borderRadius: 35 / 2,

      borderRadius: 10,
      marginLeft: 10,
    },

    labelWithImageContainer: {alignItems: 'center', flexDirection: 'row'},
  };
});
