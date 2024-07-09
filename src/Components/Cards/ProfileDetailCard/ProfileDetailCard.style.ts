import {StyleSheet} from 'react-native';

export const ProfileDetailCardStyle = StyleSheet.create((AppTheme: any) => {
  return {
    profileDetailCardContainer: {
      minHeight: 100,
      borderRadius: 15,
      backgroundColor: '#F4F4F4',
      borderWidth: 1,
      borderColor: '#FFF',
      paddingRight: 20,
      paddingLeft: 18,
      marginTop: 14,
    },
    titleContainer: {
      marginTop: 15,
    },
    title: {
      fontSize: 14,
      fontFamily: AppTheme.fonts.Inter,
      color: '#141F42',
      fontWeight: '600',
    },
    detailUnit: {
      marginTop: 12,
    },
    detailUnitInnerContainer: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 13,
      fontWeight: '500',
      fontFamily: AppTheme.fonts.Inter,
      color: '#727582',
      marginLeft: 8.25,
    },
  };
});
