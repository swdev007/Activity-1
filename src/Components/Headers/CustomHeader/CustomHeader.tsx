import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {CustomHeaderStyle} from './CustomHeader.style';
import {useSelector} from 'react-redux';
import VectorIcon from '../../Icons/VectorIcons/VectorIcons';
export const STATUSBAR_DEFAULT_HEIGHT = 20;

export function getStatusBarHeight(skipAndroid = false) {
  return Platform.select({
    ios: STATUSBAR_DEFAULT_HEIGHT,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

export const CustomHeader = ({
  type,
  name,
  onPress,
  backbtn,
  Logout,
  collection,
  onHandleBack,
}: {
  type: string;
  name?: string;
  onPress?: any;
  backbtn?: string;
  Logout?: any;
  collection: any;
  onHandleBack?: any;
}) => {
  const navigation: any = useNavigation();
  const handleLogout = async () => {
    AsyncStorage.clear();
    AsyncStorage.removeItem('LoginToken');
    navigation.navigate('SplashScreen');
  };
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = CustomHeaderStyle(AppTheme);

  return (
    <View style={styles.root}>
      <View style={styles.headerTitleLeft}>
        {type == 'Text' ? (
          <View>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.homeButtonWrapper}
              onPress={onPress}>
              <Image
                source={AppTheme.icons.home}
                style={styles.homeIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.powerIcon}
          onPress={() => handleLogout()}>
          <Image
            source={AppTheme.icons.power}
            style={styles.powerIcon}
            resizeMode="contain"
          />
          <Text style={styles.signingOffText}>Sign off</Text>
        </TouchableOpacity>
      </View>
      {backbtn ? (
        <View style={styles.backBtnWrapper}>
          <TouchableOpacity onPress={onHandleBack}>
            <VectorIcon
              groupName={'AntDesign'}
              name="left"
              size={21}
              color={'#232529'}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.collectionTextWrapper}>
            <Text style={styles.collectionText}>{collection}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.otherBtnWrapper}>
          <Text style={styles.otheBtnText}>{collection}</Text>
        </View>
      )}
    </View>
  );
};
