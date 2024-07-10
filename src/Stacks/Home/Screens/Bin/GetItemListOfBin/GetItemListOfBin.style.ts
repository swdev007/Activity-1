import {Dimensions, StyleSheet} from 'react-native';
export const GetItemListOfBinStyle = StyleSheet.create((AppTheme: any) => {
  return {
    root: {
      flex: 1,
      backgroundColor: '#fff',
    },
    viewCollectionMain1: {
      flex: 1,
      backgroundColor: '#fff',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 20,
    },
    evidenceListContainer: {
      flex: 1,
      marginTop: 5,
      marginBottom: 20,
    },
    evidenceFlatListContainerStyle: {
      flexGrow: 1,
      paddingBottom: 'auto',
    },
    emptyListConatiner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: 20,
      marginEnd: 20,
    },
    noItemText: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: AppTheme.fonts.Inter,
      color: '#1F54FD',
    },
    noItemSectionButtonWrapper: {
      width: Dimensions.get('window').width,
      marginTop: 20,
    },
    addNewItemButton: {
      tintColor: '#1F54FD',
      height: 13,
      width: 13,
      resizeMode: 'contain',
      marginRight: 8,
    },
    collectionDataItemContainer: {
      flexDirection: 'row',
      height: 63,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 14,
      alignItems: 'center',
      paddingLeft: 9,
      borderColor: '#E5E8F5',
    },
    imagePressableWrapper: {
      height: 45,
      width: 45,
      borderRadius: 45 / 2,
      backgroundColor: '#E5E8F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemImage: {
      height: 45,
      width: 45,

      borderRadius: 45 / 2,
    },
    itemIdKey: {
      fontSize: 15,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 500,
      color: '#141F42',
    },
    itemIdValue: {
      fontSize: 15,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: '700',
      color: '#141F42',
      marginLeft: 3,
    },

    itemDetails: {
      marginStart: 16,
    },

    itemKeyValueContainer: {
      flexDirection: 'row',
    },
    itemLocationKey: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 500,
      color: '#727582',
    },
    itemLocationValue: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      fontWeight: 700,
      color: '#727582',
      width: 150,
    },
    rightIconContainer: {
      marginLeft: 'auto',
      marginRight: 25,
    },
    rightIcon: {
      height: 10,
      width: 10,
    },
    loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  };
});
