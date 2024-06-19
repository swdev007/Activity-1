import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CommonBtn,
  CommonBtnWithIcon,
  HeaderComponent,
  CommonSmallBtn1,
  screenWidth,
  CustomHeaderNavigation,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import Voice from '@react-native-voice/voice';
import BottomTab from '../../../Navigation/BottomTab';
import axios from 'axios';
import {DeleteItem, updateItem} from '../../Component/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {UploadSheet} from '../../Component/UploadSheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateDeleteBinItem = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [nametext, setNameText] = useState(
    route?.params?.sendData?.name || 'Name',
  );
  const [locationtext, setLocationText] = useState(
    route?.params?.sendData?.location,
  );
  console.log(route.params?.sendData?.description);
  const [descriptiontext, setDescriptionText] = useState(
    route?.params?.sendData?.description,
  );
  const [imagepath, setImagePath] = useState(
    route?.params?.sendData?.image_url,
  );
  const [descriptionerror, setDescriptionError] = useState('');
  const [locationerror, setLocationError] = useState('');
  const [nameerror, setNameError] = useState('');
  const [screens, setscreens] = useState([]);
  const picoptionref = useRef();
  let lastButtonPressRef = useRef(null);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    const setUpVoice = async () => {
      if (await Voice.isAvailable()) {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = StopListening;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = error => {
          console.log('OnSpeechError', error), Voice.cancel();
        };

        const AndroidPermissionChecking = async () => {
          if (Platform.OS === 'android') {
            const hasPermission = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            );
            console.log('hasPermission', hasPermission);
          }
        };
        AndroidPermissionChecking();
      } else {
        console.log('not available');
      }
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    };
    setUpVoice();
  }, []);

  const onSpeechStart = event => {
    console.log('onSpeech Start ==>', event);
  };
  const onSpeechResults = event => {
    if (isListening !== true) {
      if (lastButtonPressRef.current === 'description') {
        setDescriptionText(state => state + ' ' + event.value[0]);
        Voice.cancel();
      } else if (lastButtonPressRef.current === 'location') {
        setLocationText(state => state + ' ' + event.value[0]);
        Voice.cancel();
      }
    } else {
      console.log('hello world speech else');
    }
  };

  const StartListening = async () => {
    lastButtonPressRef.current = 'description';

    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error at StartListening', error);
    }
  };

  const StartListening2 = async () => {
    lastButtonPressRef.current = 'location';

    setIsListening2(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error at StartListening', error);
    }
  };
  const StopListening = async () => {
    try {
      await Voice.stop();
      Voice.removeAllListeners();
      setIsListening(false);
      setIsListening2(false);
    } catch (error) {
      console.log('Error at StopListening', error);
    }
  };
  // console.log(imagepath);
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
          picoptionref.current.close();
        }
      });
    } else if (grid.id === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        setImagePath(image.path);
        picoptionref.current.close();
      });
    } else {
      picoptionref.current.close();
    }
  };
  const UpdateBinItemFunc = async () => {
    //var nameValid = false;
    const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    const token = await AsyncStorage.getItem('LoginToken');
    // if (nametext.length == 0) {
    //   setNameError('Name is required');
    // } else if (pattern.test(nametext) == false) {
    //   setNameError('Enter proper name');
    // } else {
    //   setNameError('');
    //   nameValid = true;
    // }
    var descriptionValid = false;
    if (descriptiontext.length == 0) {
      setDescriptionError('Description is required');
    } else {
      setDescriptionError('');
      descriptionValid = true;
    }

    var locationValid = false;
    if (locationtext.length == 0) {
      setLocationError('Location is required');
    } else {
      setLocationError('');
      locationValid = true;
    }
    if (descriptionValid && locationValid) {
      setLoading(true);
      if (imagepath) {
        let photo = {uri: imagepath};
        let formdata = new FormData();
        formdata.append('image_url', {
          uri: photo.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        formdata.append('itemId', route?.params?.id);
        formdata.append('name', null);
        formdata.append('description', descriptiontext);
        formdata.append('location', locationtext);
        formdata.append('AccessToken', token);
        axios
          .post(updateItem, formdata, {headers: {Authorization: token}})
          .then(async function (response) {
            if (response?.data?.error == false) {
              await Voice.destroy();
              Voice.removeAllListeners();
              navigation.navigate('WarrantItemDetail', {id: route?.params?.id});
              setLoading(false);
            }
          })
          .catch(function (error) {
            console.log('errror', error);
            setLoading(false);
          });
      }
    }
  };

  const handleDeleteItemFunc = () => {
    Alert.alert('Delete Evidence', 'Are you sure, you want to delete the evidence', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => DeleteItemFun()},
    ]);
  };

  const DeleteItemFun = async () => {
    const token = await AsyncStorage.getItem('LoginToken');
    setDeleteLoading(true);
    axios
      .post(
        DeleteItem,
        {itemId: route?.params?.id},
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        if (response?.data?.error == false) {
          navigation.pop(2);
          setDeleteLoading(false);
        }
      })
      .catch(function (error) {
        console.log('error at delete item func', error);
        setDeleteLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Update evidence'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={customcss.viewcollectionmain}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={customcss.Editcollectioncont}>
            {/* <View style={customcss.collectiontextcontofadditem}>
              <View style={{}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Component/Image/location.png')}
                    style={customcss.locationimage}
                  />
                  <Text style={customcss.collectiontext}> Name: </Text>
                </View>
              </View>
              <View style={{marginTop: -12}}>
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  style={customcss.inputcont2}
                  placeholder="Enter Name"
                  value={nametext}
                  onChangeText={text => setNameText(text)}
                  placeholderTextColor={'#727582'}
                />
                {nameerror.length > 0 && (
                  <Text style={customcss.error}>{nameerror}</Text>
                )}
              </View>
            </View> */}
            <View style={customcss.collectiontextcontofadditem2}>
              <View style={{}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Component/Image/location.png')}
                    style={customcss.locationimage}
                  />
                  <Text style={customcss.collectiontext}> Location: </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={customcss.audiocont}
                  onPress={() => {
                    if (!isListening) {
                      if (isListening2) {
                        StopListening();
                      } else {
                        StartListening2();
                      }
                    }
                    // isListening2 ? StopListening() : StartListening2();
                  }}>
                  {isListening2 ? (
                    <Text style={customcss.voiceButtonText}>•••</Text>
                  ) : (
                    <>
                      <Image
                        source={require('../../Component/Image/audio.png')}
                        style={{height: 14, width: 14, resizeMode: 'contain'}}
                      />

                      <Text style={customcss.audiotext}> Record </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{marginTop: -12}}>
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  style={customcss.inputcont2}
                  placeholder="Enter location"
                  value={locationtext}
                  onChangeText={text => setLocationText(text)}
                  placeholderTextColor={'#727582'}
                />
                {locationerror.length > 0 && (
                  <Text style={customcss.error}>{locationerror}</Text>
                )}
              </View>
            </View>
            <View style={customcss.collectiontextcontofadditem2}>
              <View style={{}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Component/Image/location.png')}
                    style={customcss.locationimage}
                  />
                  <Text style={customcss.collectiontext}>Description: </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={customcss.audiocont}
                  onPress={() => {
                    if (!isListening2) {
                      if (isListening) {
                        StopListening();
                      } else {
                        StartListening();
                      }
                    }
                    // isListening ? StopListening() : StartListening();
                  }}>
                  {isListening ? (
                    <Text style={customcss.voiceButtonText}>•••</Text>
                  ) : (
                    <>
                      <Image
                        source={require('../../Component/Image/audio.png')}
                        style={{height: 14, width: 14, resizeMode: 'contain'}}
                      />

                      <Text style={customcss.audiotext}> Record </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{marginTop: -12}}>
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  style={customcss.inputcont2}
                  placeholder="Enter description"
                  placeholderTextColor={'#727582'}
                  value={descriptiontext}
                  onChangeText={text => setDescriptionText(text)}
                />
                {descriptionerror.length > 0 && (
                  <Text style={customcss.error}>{descriptionerror}</Text>
                )}
              </View>
            </View>
            <View>
              {imagepath ? (
                <CommonBtnWithIcon
                  title={'Take evidence Photo'}
                  source={{uri: imagepath}}
                  style={customcss.commoniconbtnstyle}
                  width={screenWidth - 80}
                  onPress={() => HandleCamera(1)}
                />
              ) : (
                <CommonBtnWithIcon
                  title={'Take Evidence Photo'}
                  source={require('../../Component/Image/camera.png')}
                  style={customcss.commoniconbtnstyle}
                  width={screenWidth - 80}
                  onPress={() => HandleCamera(1)}
                />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 'auto',
              marginBottom: 'auto',
              justifyContent: 'space-between',
            }}>
            <CommonSmallBtn1
              title={'Save Evidence'}
              backgroundColor={'#1F54FD'}
              color={'#fff'}
              onPress={() => UpdateBinItemFunc()}
              loading={loading}
              loadercolor={'#fff'}
            />
            <CommonSmallBtn1
              title={'Delete Evidence'}
              backgroundColor={'#fff'}
              color={'#232529'}
              onPress={() => handleDeleteItemFunc()}
              deleteloading={deleteloading}
              loadercolor={'232529'}
            />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          alignSelf: 'flex-end',
        }}>
        <BottomTab type={'home'} />
      </View>
      <UploadSheet ref={picoptionref} onPress={grid => HandleCamera(grid)} />
    </View>
  );
};

export default UpdateDeleteBinItem;
