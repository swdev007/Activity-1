import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-crop-picker';
import {UploadSheet} from '../../Component/UploadSheet';
import {
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  Loadingcomponent,
  screenHeight,
  screenWidth,
} from '../../Component/Helper';
import Modal from 'react-native-modal';
import {GetItemList, updateItem} from '../../Component/Api';
import axios from 'axios';
import {Fonts} from '../../Component/Colors';
import customcss from '../../assets/customcss';
import BottomTab from '../../../Navigation/BottomTab';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import VectorIcon from '../../Component/vectorIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetItemListOfBin = ({route, navigation}) => {
  const [bindata, setBinData] = useState([]);
  const [imageurlbyid, setImageUrlById] = useState('');
  const [loading, setLoading] = useState(false);
  const [isuploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isimagechange, setIsImageChange] = useState(false);
  const [imagepath, setImagePath] = useState('');
  const picoptionref = useRef();
  const isfocused = useIsFocused();
  const [screens, setscreens] = useState([]);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isfocused) {
      GetBinItemFunc();
    }
  }, [isfocused]);

  const GetBinItemFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetItemList,
        {
          binId: route?.params?.id,
        },
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        setBinData(response?.data?.data);
        setIsImageChange(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      if (route?.params?.screenName === 'AddItem') {
        navigation.pop(2);
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation, route?.params?.screenName]);

  const HandleBackNavigation = () => {
    if (route?.params?.screenName === 'AddItem') {
      navigation.pop(2);
    } else {
      navigation.pop(1);
    }
  };
  const HandleImageFunc = (item, index) => {
    if (imagepath) {
      setImagePath('');
    }
    setImageUrlById({
      image: item?.image_url,
      location: item?.location,
      description: item?.description,
      binId: item?.id,
      name: item?.name,
    });
    setTimeout(() => {
      setModalVisible(true);
    }, 200);
  };

  const RenderCollectionData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 63,
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 14,
          alignItems: 'center',
          paddingLeft: 9,
          borderColor: '#E5E8F5',
        }}
        onPress={() =>
          navigation.navigate('BinItemDetail', {id: item?.evidence_id})
        }>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            borderRadius: 45 / 2,
            backgroundColor: '#E5E8F5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => HandleImageFunc(item, index)}>
          <Image
            source={{
              uri: item?.image_url
                ? item?.image_url
                : 'https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/03/placeholder.png',
            }}
            style={{
              height: 45,
              width: 45,
              resizeMode: 'contain',
              borderRadius: 45 / 2,
            }}
          />
        </TouchableOpacity>
        <View style={{marginStart: 16}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.Inter,
                fontWeight: '500',
                color: '#141F42',
              }}>
              ID :
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.Inter,
                fontWeight: '700',
                color: '#141F42',
                marginLeft: 3,
              }}>
              {item.evidence_id}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Inter,
                fontWeight: '500',
                color: '#727582',
              }}>
              Location :
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Inter,
                fontWeight: '700',
                color: '#727582',
                width: 150,
              }}
              numberOfLines={1}>
              {' '}
              {item?.location}{' '}
            </Text>
          </View>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 25}}>
          <Image
            source={require('../../Component/Image/righticon.png')}
            style={{height: 10, width: 10, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const HandleCamera = grid => {
    if (grid === 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        if (image.size > 10000000) {
          alert('File size is greater than 10 Mb');
        } else {
          console.log(image);
          setImagePath(image.path);
          setIsImageChange(true);
          picoptionref.current.close();
        }
      });
    } else if (grid === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        setImagePath(image.path);
        setIsImageChange(true);
        picoptionref.current.close();
      });
    } else {
      picoptionref.current.close();
    }
  };

  const handleCreateItem = () => {
    setIsUploading(true);
    if (imagepath) {
      setLoading(true);
      let photo = {uri: imagepath};
      let formdata = new FormData();
      formdata.append('image_url', {
        uri: photo.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formdata.append('itemId', imageurlbyid?.binId);
      formdata.append('name', imageurlbyid?.name);
      formdata.append('description', imageurlbyid?.description);
      formdata.append('location', imageurlbyid?.location);
      axios
        .post(updateItem, formdata)
        .then(function (response) {
          if (response?.data?.error == false) {
            setIsUploading(false);
            setModalVisible(false);
            setIsImageChange(false);
            GetBinItemFunc();
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log('errror', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Evidence List'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => HandleBackNavigation()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      {bindata.length ? (
        <View style={customcss.viewcollectionmain1}>
          <View style={{flex: 1, marginTop: 20}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={bindata}
              keyExtractor={item => item?.evidence_id}
              renderItem={(item, index) => RenderCollectionData(item, index)}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 'auto',
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginStart: 20,
            marginEnd: 20,
          }}>
          <View>
            <Text style={customcss.noitemdata}> No Evidence Data </Text>
          </View>
          <View style={{width: screenWidth, marginTop: 20}}>
            <CommonBtnWithIcon
              title={'Add Evidence'}
              onPress={() =>
                navigation.navigate('AddNewItem', {id: route?.params?.id})
              }
              source={require('../../Component/Image/additem.png')}
              style={{
                tintColor: '#1F54FD',
                height: 13,
                width: 13,
                resizeMode: 'contain',
                marginRight: 8,
              }}
              width={screenWidth - 40}
            />
          </View>
        </View>
      )}
      {modalVisible ? (
        <View style={customcss.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={customcss.centeredView}>
              <View style={customcss.modalView}>
                <AutoHeightImage
                  width={screenWidth}
                  source={{uri: imagepath ? imagepath : imageurlbyid.image}}
                  fallbackSource={imageurlbyid.image}
                />
                <TouchableOpacity
                  style={customcss.modalVisiblebtn}
                  onPress={() => setModalVisible(false)}>
                  <VectorIcon
                    groupName={'Entypo'}
                    name={'cross'}
                    size={24}
                    color={'#000'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: isimagechange ? 'row' : 'column',
                    padding: 10,
                    width: screenWidth,
                    justifyContent: isimagechange ? 'space-between' : 'center',
                    alignItems: isimagechange ? 'flex-start' : 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      customcss.button1,
                      {
                        width: isimagechange ? '46%' : '100%',
                        alignItems: 'center',
                        justifyContent: isimagechange ? 'flex-start' : 'center',
                      },
                    ]}
                    onPress={() => {
                      HandleCamera(1);
                      // Alert.alert('Change Image', '', [
                      //   {
                      //     text: 'Take Image',
                      //     onPress: () => HandleCamera(1),
                      //   },
                      //   // {
                      //   //   text: 'Upload file',
                      //   //   onPress: () => HandleCamera(2),
                      //   // },
                      //   {
                      //     text: 'Cancel',
                      //     onPress: () => HandleCamera(3),
                      //     style: 'cancel',
                      //   },
                      // ]);
                    }}>
                    <Image
                      source={require('../../Component/Image/camera.png')}
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: 'contain',
                        marginRight: 5,
                      }}
                    />
                    <Text style={customcss.textStyle}>Update New Image</Text>
                  </TouchableOpacity>
                  {isimagechange ? (
                    <TouchableOpacity
                      style={customcss.button2}
                      onPress={() => handleCreateItem()}>
                      {isuploading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text style={customcss.textStyle}>upload file </Text>
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
      <BottomTab type={'home'} />
      <UploadSheet ref={picoptionref} />
    </View>
  );
};

export default GetItemListOfBin;
