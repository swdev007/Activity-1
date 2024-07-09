import {StyleSheet} from 'react-native';
export const HomeScreenStyle = StyleSheet.create((AppTheme: any) => {
  return {
    collectionUnitWrapper: {
      flexDirection: 'row',
      height: 63,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 14,
      alignItems: 'center',
      paddingLeft: 9,
      borderColor: '#E5E8F5',
    },
    lockImageWrapper: {
      height: 45,
      width: 45,
      borderRadius: 45 / 2,
      backgroundColor: '#E5E8F5',
      justifyContent: 'center',
      alignItems: 'center',
    },

    lockImage: {height: 24, width: 24},
    caseInitialText: {
      fontSize: 15,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 500,
      color: '#141F42',
    },
    caseNumber: {
      fontSize: 15,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 700,
      color: '#141F42',
      marginLeft: 3,
    },
    locationInitial: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 500,
      color: '#727582',
    },
    location: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 700,
      color: '#727582',
      width: 150,
      textAlign: 'left',
    },
    rightIconWrapper: {
      marginLeft: 'auto',
      marginRight: 25,
    },
    rightIcon: {
      height: 10,
      width: 10,
    },
    ImageBackgroundcss: {
      height: 68,
      width: '50%',
      resizeMode: 'contain',
      marginTop: 60,
    },
    dataFields: {
      flexDirection: 'row',
    },
    collectionListUi: {
      flex: 1,
      marginTop: 20,
      marginStart: 20,
      marginEnd: 20,
    },
    caseListHeaderText: {
      fontSize: 16,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 600,
      color: '#141F42',
      marginBottom: 13,
    },
    collectionListContainer: {
      flexGrow: 1,
      paddingBottom: 5,
    },
    bottomTabWrapper: {
      position: 'absolute',
      marginTop: 'auto',
      bottom: 0,
    },
  };
});
