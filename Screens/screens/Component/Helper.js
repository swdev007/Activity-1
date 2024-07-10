import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Colors, Fonts} from './Colors';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
import VectorIcon from './vectorIcons';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import customcss from '../assets/customcss';
import axios from 'axios';
import {GetBinDetails, GetCollectionDetails, logout} from './Api';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const STATUSBAR_DEFAULT_HEIGHT = 20;
export const STATUSBAR_X_HEIGHT = 44;
export const STATUSBAR_IP12_HEIGHT = 47;
export const STATUSBAR_IP12MAX_HEIGHT = 47;
export const STATUSBAR_IP13MINI_HEIGHT = 50;
export const STATUSBAR_IP14PRO_HEIGHT = 59;
export const X_WIDTH = 375;
export const X_HEIGHT = 812;
export const XSMAX_WIDTH = 414;
export const XSMAX_HEIGHT = 896;
export const IP12_WIDTH = 390;
export const IP12_HEIGHT = 844;
export const IP12MAX_WIDTH = 428;
export const IP12MAX_HEIGHT = 926;
export const IP13MINI_WIDTH = 375;
export const IP13MINI_HEIGHT = 812;
export const IP14PRO_WIDTH = 393;
export const IP14PRO_HEIGHT = 852;
export const IP14MAX_WIDTH = 430;
export const IP14MAX_HEIGHT = 932;
export const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');
export let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
export let isIPhoneX_v = false;
export let isIPhoneXMax_v = false;
export let isIPhone12_v = false;
export let isIPhone12Max_v = false;
export let isIPhone13Mini_v = false;
export let isIPhoneWithMonobrow_v = false;
export let isIPhoneWithDynamicIsland_v = false;

if (Platform.OS === 'ios' && !Platform.isPad) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneX_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneXMax_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12_v = true;
    statusBarHeight = STATUSBAR_IP12_HEIGHT;
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12Max_v = true;
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
  } else if (W_WIDTH === IP13MINI_WIDTH && W_HEIGHT === IP13MINI_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone13Mini_v = true;
    statusBarHeight = STATUSBAR_IP13MINI_HEIGHT;
  } else if (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneWithDynamicIsland_v = true;
    statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
  } else if (W_WIDTH === IP14MAX_WIDTH && W_HEIGHT === IP14MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneWithDynamicIsland_v = true;
    statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
  }
}

export const isIPhoneX = () => isIPhoneX_v;
export const isIPhoneXMax = () => isIPhoneXMax_v;
export const isIPhone12 = () => isIPhone12_v;
export const isIPhone12Max = () => isIPhone12Max_v;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;
export const isIPhone13Mini = () => isIPhone13Mini_v;
export const isIPhoneWithDynamicIsland = () => isIPhoneWithDynamicIsland_v;

export function getStatusBarHeight(skipAndroid) {
  return Platform.select({
    ios: statusBarHeight,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

export function ImageComponent({style, source, resizeMode, tintColor}) {
  return (
    <FastImage
      tintColor={tintColor}
      source={source}
      style={style}
      resizeMode={
        resizeMode === 'contain'
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.cover
      }
    />
  );
}

export function AppText({style, children, numberOfLines, onPress}) {
  return (
    <Text style={style} numberOfLines={numberOfLines} onPress={onPress}>
      {children}
    </Text>
  );
}

export function TouchableComponent({
  onPress,
  style,
  children,
  onLongPress,
  hitSlop,
  onPressIn,
}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
      hitSlop={hitSlop}
      onPressIn={onPressIn}>
      {children}
    </TouchableOpacity>
  );
}

export function CommonBtn({onPress, title, backgroundColor, color, loading}) {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        borderRadius: 8,
        height: 54,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 20,
        width: screenWidth / 1.2,
      }}>
      <View style={styles.btnSub}>
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <AppText style={[styles.btntxt, {color: color}]}>{title}</AppText>
        )}
      </View>
    </TouchableComponent>
  );
}

export function CommonBtn1({onPress, loading, title, color}) {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        borderRadius: 8,
        height: 54,
        backgroundColor: '#1F54FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 20,
        width: screenWidth / 1.27,
      }}>
      <View style={styles.btnSub}>
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <AppText style={[styles.btntxt, {color: color}]}>{title}</AppText>
        )}
      </View>
    </TouchableComponent>
  );
}
export function CommonBtnWithIcon({
  onPress,
  ImageError,
  title,
  width,
  source,
  style,
}) {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        borderRadius: 5,
        height: 48,
        backgroundColor: '#E5E8F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: ImageError ? 10 : 20,
        alignSelf: 'center',
        width: width,
      }}>
      <View style={styles.btnWithIcon}>
        <Image source={source} style={style} />
        <AppText style={styles.btnwithIcontxt}>{title}</AppText>
      </View>
    </TouchableComponent>
  );
}
export function CommonSmallBtn1({
  onPress,
  loading,
  deleteloading,
  title,
  backgroundColor,
  color,
  loadercolor,
}) {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        borderRadius: 5,
        height: 48,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 20,
        width: '47%',
        borderColor: '#C6C9D7',
        borderWidth: 1,
      }}>
      {loading || deleteloading ? (
        <ActivityIndicator size={'small'} color={loadercolor} />
      ) : (
        <AppText style={[styles.smallbtnSubText1, {color: color}]}>
          {title}
        </AppText>
      )}
    </TouchableComponent>
  );
}
export function CommonBtnForViewItem({onPress}) {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: '100%',
        marginStart: 17,
        marginEnd: 17,
      }}>
      <AppText style={[styles.btntxt, {color: '#0F48FF'}]}>
        View evidence
      </AppText>
    </TouchableComponent>
  );
}
export function CollectionDetail({
  item,
  onPress,
  id,
  binId,
  binlocation,
  bindescription,
  image,
  name,
  createby,
  updatedby,
}) {
  const [collectiondetail, setCollectionDetail] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      GetCollectionDetailsFuc();
    }
  }, [isFocused]);

  const GetCollectionDetailsFuc = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    // add token
    axios
      .post(
        GetCollectionDetails,
        {
          collectionId: id,
        },
        {
          headers: {Authorization: 'Bearer ' + token},
        },
      )
      .then(function (response) {
        setCollectionDetail(response.data.data);
        console.log('details --->', response?.data?.data);
      })
      .catch(function (error) {
        console.log('error of get detail', error);
      });
  };
  return (
    <View style={customcss.collectioncont}>
      <View style={customcss.collectiontextcont}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            source={require('../Component/Image/collection.png')}
            style={customcss.collectionimage}
          />
          {binId ? (
            <Text style={customcss.collectiontext}>Evidence Name:</Text>
          ) : (
            <Text style={customcss.collectiontext}>Case:</Text>
          )}
        </View>
        <View
          style={{
            marginLeft: 12,
            justifyContent: 'center',
          }}>
          {binId ? (
            <Text style={customcss.collectionId}>#{binId}</Text>
          ) : (
            <Text style={customcss.collectionId}>
              {collectiondetail?.case_number}
            </Text>
          )}
        </View>
      </View>
      {name ? (
        <View style={customcss.collectiontextcont}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../Component/Image/collection.png')}
              style={customcss.collectionimage}
            />
            <Text style={customcss.collectiontext}>Name:</Text>
          </View>
          <View
            style={{
              marginLeft: 12,
              justifyContent: 'center',
            }}>
            <Text style={customcss.collectionIdtext}>{name}</Text>
          </View>
        </View>
      ) : null}
      <View style={customcss.collectiontextcont}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            source={require('../Component/Image/info.png')}
            style={customcss.collectionimage}
          />
          <Text style={customcss.collectiontext}>Description:</Text>
        </View>
        <View
          style={{
            marginLeft: 12,
            justifyContent: 'center',
          }}>
          {bindescription ? (
            <Text style={customcss.collectionIdtext} numberOfLines={3}>
              {bindescription}
            </Text>
          ) : (
            <Text style={customcss.collectionIdtext} numberOfLines={3}>
              {collectiondetail?.description}
            </Text>
          )}
        </View>
      </View>
      {item ? (
        <CommonBtnForViewItem onPress={onPress} />
      ) : (
        <View style={customcss.collectiontextcont}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../Component/Image/location.png')}
              style={customcss.collectionimage}
            />
            <Text style={customcss.collectiontext}>Location:</Text>
          </View>
          <View
            style={{
              marginLeft: 12,
              justifyContent: 'center',
            }}>
            {binlocation ? (
              <Text style={customcss.collectionIdtext} numberOfLines={3}>
                {binlocation}
              </Text>
            ) : (
              <Text style={customcss.collectionIdtext} numberOfLines={3}>
                {collectiondetail?.location}
              </Text>
            )}
          </View>
        </View>
      )}
      {createby ? (
        <View style={customcss.collectiontextcont}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../Component/Image/info.png')}
              style={customcss.collectionimage}
            />
            <Text style={customcss.collectiontext}>Created By:</Text>
          </View>
          <View
            style={{
              marginLeft: 12,
              justifyContent: 'center',
            }}>
            <Text style={customcss.collectionIdtext} numberOfLines={3}>
              {createby}
            </Text>
          </View>
        </View>
      ) : null}
      {updatedby ? (
        <View style={customcss.collectiontextcont}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../Component/Image/info.png')}
              style={customcss.collectionimage}
            />
            <Text style={customcss.collectiontext}>Updated By:</Text>
          </View>
          <View
            style={{
              marginLeft: 12,
              justifyContent: 'center',
            }}>
            <Text style={customcss.collectionIdtext} numberOfLines={3}>
              {updatedby}
            </Text>
          </View>
        </View>
      ) : null}
      {image ? (
        <View
          style={{
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 'auto',
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{marginBottom: 'auto'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={require('../Component/Image/camera.png')}
                style={customcss.collectionimage}
              />
              <Text style={customcss.collectiontext}>Image:</Text>
            </View>
          </View>
          {image ? (
            <Image
              source={{uri: image}}
              style={{
                height: 70,
                width: 70,
                // borderRadius: 35 / 2,
                resizeMode: 'contain',
                borderRadius: 10,
                marginLeft: 10,
              }}
            />
          ) : (
            <Image
              source={require('../Component/Image/placeholder.png')}
              style={{
                height: 70,
                width: 70,
                // borderRadius: 35 / 2,
                resizeMode: 'contain',
                borderRadius: 10,
                marginLeft: 10,
              }}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}

export function HeaderComponent({
  type,
  name,
  onPress,
  backbtn,
  Logout,
  collection,
  onHandleBack,
}) {
  const navigation = useNavigation();
  const handleLogout = async () => {
    AsyncStorage.clear();
    AsyncStorage.removeItem('LoginToken');
    navigation.navigate('SplashScreen');
  };

  return (
    <View
      style={{
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
      }}>
      <View
        style={{
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
        }}>
        {type == 'Text' ? (
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                fontStyle: 'normal',
                color: '#0F48FF',
                fontFamily: Fonts.Inter,
              }}>
              Hello,
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                fontStyle: 'italic',
                color: '#141F42',
                fontFamily: Fonts.Inter,
              }}>
              {name}
            </Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{
                height: 42,
                width: 42,
                borderWidth: 1,
                borderColor: '#fff',
                backgroundColor: '#D6DEFF',
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onPress}>
              <Image
                source={require('../Component/Image/home.png')}
                style={{height: 20, width: 22, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={{
            height: 37,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 5,
            width: 101,
          }}
          onPress={() => handleLogout()}>
          <Image
            source={require('../Component/Image/power.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontStyle: 'normal',
              color: '#0F48FF',
              fontFamily: Fonts.Inter,
              marginLeft: 4,
            }}>
            Sign off
          </Text>
        </TouchableOpacity>
      </View>
      {backbtn ? (
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onHandleBack}>
            <VectorIcon
              groupName={'AntDesign'}
              name="left"
              size={21}
              color={'#232529'}
              style={{left: 22}}
            />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              right: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                fontStyle: 'normal',
                color: '#232529',
                fontFamily: Fonts.Inter,
                marginLeft: 4,
                textTransform: 'capitalize',
              }}>
              {collection}
            </Text>
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              fontStyle: 'normal',
              color: '#232529',
              fontFamily: Fonts.Inter,
              marginLeft: 4,
              textTransform: 'capitalize',
            }}>
            {collection}
          </Text>
        </View>
      )}
    </View>
  );
}

export function TextInputComponent({
  placeholder,
  style,
  secureTextEntry,
  keyboardType,
  editable,
  maxLength,
  onChangeText,
  value,
  returnKeyType,
  onBlur,
  onFocus,
  onSubmitEditing,
  autoFocus,
  multiline,
  blurOnSubmit,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={Colors.newinputfied}
      style={style}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      editable={editable}
      maxLength={maxLength}
      onChangeText={onChangeText}
      value={value}
      returnKeyType={returnKeyType}
      autoCapitalize="none"
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autoFocus}
      multiline={multiline}
      blurOnSubmit={blurOnSubmit}
      selectionColor={Colors.mainColor}
    />
  );
}

export function Loadingcomponent() {
  return (
    <Modal
      isVisible={true}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'trasnsparent',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <ActivityIndicator
          animating={true}
          color={Colors.mainColor}
          type="large"
        />
        {/* <AnimatedLoader
          visible={true}
          overlayColor={Colors.mainColor}
          animationStyle={styles.lottie}
          speed={1}>
          <Text>Doing something...</Text>
        </AnimatedLoader> */}
        {/* <FastImage
          style={{
            width: 50,
            height: 50,
            transform: [{rotate: '45deg'}],
          }}
          source={require('../Images/final.gif')}  
          resizeMode={FastImage.resizeMode.contain}
        /> */}
      </View>
    </Modal>
  );
}

export function CommonInput({
  label,
  labeltype,
  iconSource,
  secureTextEntry,
  onChangeText,
  value,
  onPress,
  source,
  error,
  showlabel,
  errorspacing,
  placeholder,
  lefticon,
  keyboardType,
  maxLength,
  returnKeyType,
  model,
  onFocus,
  autoFocus,
  multi,
  multiline,
  blurOnSubmit,
  height,
  size,
  txtlabel,
  selectionColor,
  ref,
  istab,
  icolor,
  placeholderTextColor,
  isicon,
  txtcolor,
}) {
  return (
    <View>
      {showlabel === 'no' ? null : (
        <AppText
          style={{
            fontSize: 16,
            color: 'grey',
            marginBottom: 5,
            fontFamily: Fonts.SemiBold,
          }}>
          {txtlabel}
        </AppText>
      )}
      <View
        style={[
          styles.textBoxBtnHolder,
          {borderRadius: multi === 'yes' ? 13 : 8},
        ]}>
        {isicon !== 'no' ? (
          <View
            style={[
              styles.icon,
              {
                width: model === 'yes' ? 15 : 25,
                height: model === 'yes' ? 15 : 25,
                top: model === 'yes' ? 15 : 16,
              },
            ]}>
            <VectorIcon
              name={label}
              size={size}
              groupName={labeltype}
              color={icolor}
            />
          </View>
        ) : null}
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          style={[
            styles.textBox,
            {
              paddingLeft: 13,
              width: screenWidth / 1.1,
              minHeight: multi === 'yes' ? height : 54,
              textAlignVertical: multi === 'yes' ? 'top' : 'center',
              paddingRight: multi === 'yes' ? 20 : isicon === 'no' ? 15 : 45,
              paddingTop: multi === 'yes' ? 15 : 0,
              borderRadius: 8,
              // color: {txtcolor},
            },
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.newinputfied}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onFocus={onFocus}
          autoFocus={autoFocus}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          selectionColor={selectionColor}
          ref={ref}
        />
        <TouchableComponent
          activeOpacity={0.8}
          style={styles.visibilityBtn}
          onPress={onPress}>
          <ImageComponent source={source} style={styles.btnImage} />
        </TouchableComponent>
      </View>
      <AppText
        style={[
          styles.errortxt,
          {marginVertical: errorspacing === 'yes' ? 10 : 5},
        ]}>
        {error}
      </AppText>
    </View>
  );
}

export function CustomHeaderNavigation({data, currentname}) {
  const navigation = useNavigation();
  const getName = name => {
    switch (name) {
      case 'ViewCollection': {
        return 'View Case';
      }
      case 'BinList': {
        return 'Warrant List';
      }
      case 'BinDetails': {
        return 'Warrant Evidence';
      }
      case 'GetItemListOfBin': {
        return 'Evidence List';
      }
      default: {
        return name;
      }
    }
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10, paddingHorizontal: 15}}
        key={'2'}
        // horizontal
        numColumns={4}
        data={data}
        renderItem={({item}) => (
          <>
            {item.name !== currentname ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppText style={{color: Colors.black}}>
                  {getName(item.name)}
                </AppText>
                <VectorIcon groupName={'AntDesign'} name={'right'} />
              </View>
            ) : null}
          </>
        )}
      />
    </View>
  );
}
export function SpaceComponent() {
  return <View style={styles.space} />;
}

export function BackHeaderComponent({onpress}) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        borderWidth: 1,
        height: 30,
        width: 30,
        borderRadius: 6,
        position: 'absolute',
        borderColor: 'white',
        backgroundColor: '#D6DEFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <VectorIcon
        groupName={'AntDesign'}
        name="left"
        size={18}
        onPress={onpress}
        color={'#0F48FF'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  typee: {
    color: Colors.mainColor,
    fontSize: 10,
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  space: {
    marginVertical: 10,
  },
  logo: {
    height: 45,
    width: 81,
  },
  cv: {
    color: Colors.white,
    textAlign: 'left',
    width: 25,
    marginLeft: 3,
  },
  cvv: {
    color: Colors.white,
    width: 25,
    textAlign: 'right',
    marginRight: 3,
  },
  modalmain: {
    flex: 1,
    maxHeight: 100,
    width: screenWidth / 1.1,
    backgroundColor: Colors.mainColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: {padding: 5},
  intcontainer: {
    height: 20,

    width: screenWidth,
  },
  inttext: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
  commonBtn: {
    width: 150,
    height: 55,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // borderRadius: 25,
    marginTop: 25,
    alignSelf: 'center',
    // borderTopStartRadius: 22,
    // borderTopEndRadius: 22,
    // borderBottomStartRadius: 22,
  },

  btntxt: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.Inter,
    lineHeight: 22,
  },
  btntxt1: {
    color: Colors.mainColor,
    fontSize: 18,
    fontFamily: Fonts.ITCAvantGardeStdBold,
    textTransform: 'uppercase',
    // fontFamily: Fonts.Bold,
  },

  label: {
    fontSize: 16,
    color: Colors.label,
    marginBottom: 5,
    // fontFamily: Fonts.Regular,
  },
  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    overflow: 'visible',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    elevation: 5,
  },
  backbtnimg: {
    height: 41,
    width: 41,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  backbtn: {
    marginTop: Platform.OS === 'android' ? 15 : 45,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  CYP: {
    color: Colors.newtext,
    marginLeft: 20,
    fontSize: 18,
    fontFamily: Fonts.DinMedium,
  },
  textBox: {
    fontSize: 16,
    height: 40,
    paddingRight: 45,
    paddingLeft: 30,
    paddingVertical: 0,
    width: screenWidth / 1.14,
    fontFamily: Fonts.ITCAvantGardeStdMd,
    color: Colors.black,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 15,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  errortxt: {
    fontSize: 10,
    color: Colors.red,
    marginVertical: 10,
    fontFamily: Fonts.ITCAvantGardeStdMd,
    alignSelf: 'flex-start',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 13,
  },
  btnSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  flexx: {
    backgroundColor: Colors.sliderpagi,
  },

  row: {
    flexDirection: 'row',
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.mainColor,
  },

  cen: {
    alignSelf: 'center',
  },

  btnoption: {
    height: 45,
    width: screenWidth,
    borderBottomColor: Colors.accBorder,
    borderBottomWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.sliderpagi,
  },
  optionsub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  optionTxt: {
    fontSize: 18,
    // fontFamily: Fonts.DinMedium,
    marginLeft: 10,
  },
  cross: {
    alignSelf: 'flex-end',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 20,
  },
  gridButtonContainer: {
    flexBasis: '33%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 30,
    color: 'white',
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: '#333',
    // fontFamily: Fonts.Regular,
  },
  appnametxt: {
    fontSize: 33,
    color: Colors.mainColor,
    // fontFamily: Fonts.Bold,
  },
  verifypopup: {
    minHeight: 200,
    width: screenWidth / 1.1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    alignSelf: 'center',
  },
  crossbtn: {
    position: 'absolute',
    right: -5,
    top: -10,
  },
  verifypopuppara: {
    fontSize: 18,
    // fontFamily: Fonts.DinMedium,
    color: Colors.newtext,
    width: screenWidth / 1.25,
    textAlign: 'center',
    lineHeight: 25,
  },
  resendbtn: {
    height: 40,
    width: 100,
    backgroundColor: Colors.mainColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resendbtntxt: {
    // fontFamily: Fonts.Bold,
    fontSize: 18,
    color: Colors.textcolor,
  },
  resendbtn1: {
    height: 40,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  resendbtntxt1: {
    // fontFamily: Fonts.Bold,
    fontSize: 18,
    color: Colors.mainColor,
  },
  select: {
    backgroundColor: Colors.mainColor,
    height: 6,
    alignSelf: 'center',
    borderRadius: 100,
    width: 100,
  },
  unselect: {
    backgroundColor: Colors.newinput,
    height: 6,
    alignSelf: 'center',
    borderRadius: 100,
    width: 100,
  },
  marker: {
    height: 0,
    width: 0,
    backgroundColor: 'transparent',
  },
  touchdim: {
    height: 40,
    width: 40,
    borderRadius: 20,
    slipDisplacement: 40,
  },
  btnWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnwithIcontxt: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.Inter,
    lineHeight: 22,
    textTransform: 'capitalize',
    color: '#1F54FD',
  },
  smallbtnSubText1: {
    fontSize: 14,
    fontFamily: Fonts.Inter,
    fontWeight: '600',
    textTransform: 'capitalize',
    lineHeight: 22,
  },
});
