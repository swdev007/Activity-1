import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  CommonSmallBtn1,
  CustomHeaderNavigation,
  HeaderComponent,
  screenWidth,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import Voice from '@react-native-voice/voice';
import {updateCollection} from '../../Component/Api';
import axios from 'axios';
import BottomTab from '../../../Navigation/BottomTab';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../Component/Colors';

const EditCollection = ({navigation, route}) => {
  // console.log('', route);

  const [recordText, setRecordText] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [color, setColor] = useState('red');
  const [descriptionerror, setDescriptionError] = useState('');
  const [locationerror, setLocationError] = useState('');
  const [locationtext, setLocationText] = useState(
    route?.params?.sendData?.location,
  );
  const [descriptiontext, setDescriptionText] = useState(
    route?.params?.sendData?.description,
  );
  let lastButtonPressRef = useRef(null);
  const [screens, setscreens] = useState([]);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
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

  const onSpeechStart = event => {
    console.log('onSpeech Start ==>', event);
  };

  // const onSpeechResults = event => {
  //   if (isListening !== true) {
  //     if (lastButtonPressRef.current === 'description' && descriptiontext) {
  //       setDescriptionText(state => state + ' ' + event.value[0]);
  //     } else if (lastButtonPressRef.current === 'location' && locationtext) {
  //       setLocationText(state => state + ' ' + event.value[0]);
  //     }
  //   } else {
  //     console.log('hello world speech else');
  //   }
  // };
  const onSpeechResults = event => {
    console.log('result==>', event);
    if (isListening !== true) {
      if (lastButtonPressRef.current === 'description' && descriptiontext) {
        setIsListening(false);
        setDescriptionText(state => state + ' ' + event.value[0]);
      } else if (lastButtonPressRef.current === 'location' && locationtext) {
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

  const SaveCollection = () => {
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
      let body = {
        collectionId: route?.params?.id,
        description: descriptiontext,
        location: locationtext,
        status: 1,
      };
      axios
        .post(updateCollection, body)
        .then(async function (response) {
          if (response.data.error == false) {
            await Voice.destroy();
            Voice.removeAllListeners();
            navigation.navigate('ViewCollection', {id: route?.params?.id});
            setLoading(false);
          } else if (response.data.error == true) {
            setDescriptionError(response?.data?.message?.description[0]);
            setLocationError(response?.data?.message?.location[0]);
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log('get error from update collection', error);
          setLoading(false);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Edit collection'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
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
            <View
              style={{
                marginStart: 20,
                marginEnd: 20,
                marginBottom: 11,
              }}>
              <View style={customcss.collectiontextcont}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Image
                    source={require('../../Component/Image/collection.png')}
                    style={customcss.collectionimage}
                  />
                  <Text style={customcss.collectiontext}> Collection: </Text>
                </View>
                <View style={{marginLeft: 12, justifyContent: 'center'}}>
                  <Text style={customcss.collectionId}>
                    #{route?.params?.sendData?.id}{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 12,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Component/Image/info.png')}
                        style={customcss.collectionimage}
                      />
                      <Text style={customcss.collectiontext}>Description:</Text>
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
                            style={{
                              height: 14,
                              width: 14,
                              resizeMode: 'contain',
                            }}
                          />

                          <Text style={customcss.audiotext}> Record </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TextInput
                      textAlignVertical="top"
                      multiline={true}
                      style={[customcss.inputcont1, {color: Colors.black}]}
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry"
                      placeholderTextColor={'#727582'}
                      value={descriptiontext}
                      onChangeText={text => setDescriptionText(text)}
                    />
                    {descriptionerror.length > 0 && (
                      <Text style={customcss.error}>{descriptionerror}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 12,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../Component/Image/location.png')}
                        style={customcss.collectionimage}
                      />
                      <Text style={customcss.collectiontext}>Location:</Text>
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
                            style={{
                              height: 14,
                              width: 14,
                              resizeMode: 'contain',
                            }}
                          />

                          <Text style={customcss.audiotext}> Record </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TextInput
                      textAlignVertical="top"
                      multiline={true}
                      style={[customcss.inputcont1, {color: Colors.black}]}
                      placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry"
                      value={locationtext}
                      onChangeText={text => setLocationText(text)}
                      placeholderTextColor={'#727582'}
                    />
                    {locationerror.length > 0 && (
                      <Text style={customcss.error}>{locationerror}</Text>
                    )}
                  </View>
                </View>
              </View>
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
              title={'Save collection'}
              backgroundColor={'#1F54FD'}
              color={'#fff'}
              onPress={() => SaveCollection()}
              loading={loading}
            />
            <CommonSmallBtn1
              title={'Cancel Changes'}
              backgroundColor={'#fff'}
              color={'#232529'}
              onPress={() => navigation.goBack('')}
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
    </View>
  );
};

export default EditCollection;
