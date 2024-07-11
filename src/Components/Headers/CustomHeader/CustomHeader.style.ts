import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getStatusBarHeight} from './CustomHeader';
export const CustomHeaderStyle = (AppTheme: any) =>
  StyleSheet.create({
    root: {
      height:
        Platform.OS == 'android'
          ? 115
          : DeviceInfo.hasNotch()
          ? getStatusBarHeight() + 100
          : 115,
      backgroundColor: '#D6DEFF',
      borderBottomStartRadius: 25,
      borderBottomEndRadius: 25,
      alignContent: 'center',
    },
    headerTitleLeft: {
      marginTop:
        Platform.OS == 'android'
          ? 11
          : DeviceInfo.hasNotch()
          ? getStatusBarHeight()
          : 11,
      marginStart: 20,
      marginEnd: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    helloText: {
      fontSize: 22,
      fontWeight: '700',
      fontStyle: 'normal',
      color: '#0F48FF',
      fontFamily: AppTheme.fonts.Inter,
    },
    nameText: {
      fontSize: 18,
      fontWeight: '500',
      fontStyle: 'italic',
      color: '#141F42',
      fontFamily: AppTheme.fonts.Inter,
    },
    homeButtonWrapper: {
      height: 42,
      width: 42,
      borderWidth: 1,
      borderColor: '#fff',
      backgroundColor: '#D6DEFF',
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeIcon: {
      height: 20,
      width: 22,
    },
    powerIconWrapper: {
      height: 37,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 101,
    },
    powerIcon: {
      height: 18,
      width: 18,
      backgroundColor: '#fff',
    },
    signingOffText: {
      fontSize: 15,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#0F48FF',
      fontFamily: AppTheme.fonts.Inter,
      marginLeft: 4,
    },
    backBtnWrapper: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backIcon: {left: 22},
    collectionTextWrapper: {
      marginLeft: 'auto',
      marginRight: 'auto',
      right: 10,
    },
    collectionText: {
      fontSize: 20,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#232529',
      fontFamily: AppTheme.fonts.Inter,
      marginLeft: 4,
      textTransform: 'capitalize',
    },
    otherBtnWrapper: {alignItems: 'center', marginTop: 10},
    otheBtnText: {
      fontSize: 20,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#232529',
      fontFamily: AppTheme.fonts.Inter,
      marginLeft: 4,
      textTransform: 'capitalize',
    },
  });
