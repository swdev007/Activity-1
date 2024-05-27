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
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppText,
  CommonBtn,
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  screenWidth,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import Voice from '@react-native-voice/voice';
import BottomTab from '../../../Navigation/BottomTab';
import axios from 'axios';
import {AddItem} from '../../Component/Api';
import ImagePicker from 'react-native-image-crop-picker';
import {UploadSheet} from '../../Component/UploadSheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VectorIcon from '../../Component/vectorIcons';
const AddNewItem = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [nametext, setNameText] = useState('');
  const [locationtext, setLocationText] = useState('');
  const [descriptiontext, setDescriptionText] = useState('');
  const [descriptionerror, setDescriptionError] = useState('');
  const [locationerror, setLocationError] = useState('');
  const [imageerror, setImageError] = useState('');
  const [nameerror, setNameError] = useState('');
  const [imagepath, setImagePath] = useState('');
  const [token, settoken] = useState('');
  const [screens, setscreens] = useState([]);
  const picoptionref = useRef();
  let lastButtonPressRef = useRef(null);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    handletoken();
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = StopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => console.log('OnSpeechError', error);

    const AndroidPermissionChecking = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
      }
    };
    AndroidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handletoken = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    settoken(token);
  };

  const onSpeechStart = event => {
    console.log('onSpeech Start ==>', event);
  };
  const onSpeechResults = event => {
    if (isListening !== true) {
      if (lastButtonPressRef.current === 'description') {
        setDescriptionText(state => state + ' ' + event.value[0]);
      } else if (lastButtonPressRef.current === 'location') {
        setLocationText(state => state + ' ' + event.value[0]);
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

  const handleCreateItem = () => {
    // var nameValid = false;
    const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    // if (nametext.length == 0) {
    //   setNameError('Name is required');
    // } else
    //  if (pattern.test(nametext) == false) {
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
    var imageValid = false;
    if (imagepath.length == 0) {
      setImageError('Image is required');
    } else {
      setImageError('');
      imageValid = true;
    }
    if (descriptionValid && locationValid && imageValid) {
      if (imagepath) {
        setLoading(true);
        let photo = {uri: imagepath};
        let formdata = new FormData();
        formdata.append('image_url', {
          uri: photo.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        formdata.append('binId', route?.params?.id);
        formdata.append('name', null);
        formdata.append('description', descriptiontext);
        formdata.append('location', locationtext);
        formdata.append('AccessToken', token);
        axios
          .post(AddItem, formdata)
          .then(async function (response) {
            if (response?.data?.error == false) {
              await Voice.destroy();
              Voice.removeAllListeners();

              navigation.navigate('GetItemListOfBin', {
                id: route?.params?.id,
                screenName: 'AddItem',
              });
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
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Add item'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
        {/* <CustomHeaderNavigation routename1={'gg'} routename2={'hhh'} /> */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                  title={'Take item Photo'}
                  source={{uri: imagepath}}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    borderRadius: 20 / 2,
                    marginRight: 5,
                  }}
                  width={screenWidth - 80}
                  onPress={() => HandleCamera(1)}
                />
              ) : (
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <CommonBtnWithIcon
                    title={'Take item Photo'}
                    source={require('../../Component/Image/camera.png')}
                    ImageError={'ImageError'}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                      borderRadius: 20 / 2,
                      marginRight: 5,
                    }}
                    width={screenWidth - 80}
                    onPress={() => HandleCamera(1)}
                  />
                  {imageerror.length > 0 && (
                    <Text style={customcss.error}>{imageerror}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
          <View>
            <CommonBtn
              title={'create Item'}
              backgroundColor={'#1F54FD'}
              color={'#fff'}
              onPress={() => handleCreateItem()}
              loading={loading}
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

export default AddNewItem;
