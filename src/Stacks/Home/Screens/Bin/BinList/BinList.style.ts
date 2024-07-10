import {StyleSheet} from 'react-native';
export const BinListStyle = StyleSheet.create((AppTheme: any) => {
  return {
    root: {flex: 1, backgroundColor: '#fff'},
    collectionListUi: {
      flex: 1,
      marginTop: 20,
      marginStart: 20,
      marginEnd: 20,
    },
    title: {
      fontSize: 16,
      fontFamily: AppTheme.fonts.InterBlack,
      fontWeight: '600',
      color: '#141F42',
      marginBottom: 13,
    },
    listContainer: {
      flexGrow: 1,
      paddingBottom: 5,
    },
    collectionDataItem: {
      flexDirection: 'row',
      minHeight: 63,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 14,
      alignItems: 'center',
      paddingLeft: 9,
      borderColor: '#E5E8F5',
    },
    collectionDataItemImageContainer: {
      height: 45,
      width: 45,
      borderRadius: 45 / 2,
      backgroundColor: '#E5E8F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    collectionDataItemImage: {height: 24, width: 24},
    binName: {
      fontSize: 15,
      fontFamily: AppTheme.InterBlack,
      fontWeight: '700',
      color: '#141F42',
      marginLeft: 3,
    },
    locationContainer: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.InterBlack,
      fontWeight: '700',
      color: '#727582',
      textAlign: 'left',
      width: '100%',
    },
    locationText: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.InterBlack,
      fontWeight: '500',
      color: '#727582',
    },
    rightIconContainer: {marginLeft: 'auto', marginRight: 25},
    rightIcon: {height: 10, width: 10},
  };
});
