import {StyleSheet} from 'react-native';
export const EvidenceListItemCardStyle = StyleSheet.create((AppTheme: any) => {
  return {
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
  };
});
