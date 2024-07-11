import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';

import Voice from '@react-native-voice/voice';
import BottomTab from '../../../../BottomTab/BottomTab';
import axios from 'axios';
import {AddItem as AddItemRoute} from '../../../../../Services/Auth/apiRoutes';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
import {addItemStyle} from './AddItem.style';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import CustomInput from '../../../../../Components/CustomInput/CustomInput';
import {UploadSheet} from '../../../../../Components/UploadSheet/UploadSheet';
import CommonButtonWithIcon from '../../../../../Components/Buttons/CommonButtonWithIcon/CommonButtonWithIcon';
import CustomButton from '../../../../../Components/Buttons/CommonButton/CustomButton';

const AddItem = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [locationtext, setLocationText] = useState('');
  const [descriptiontext, setDescriptionText] = useState('');
  const [descriptionerror, setDescriptionError] = useState('');
  const [locationerror, setLocationError] = useState('');
  const [imageerror, setImageError] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const [imagepath, setImagePath] = useState('');
  const [token, settoken] = useState('');
  const [screens, setscreens] = useState([]);
  const picoptionref = useRef<any>();
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = addItemStyle(AppTheme);
  let lastButtonPressRef = useRef(null);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    handletoken();
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = StopListening;
    Voice.onSpeechResults = debounce(onSpeechResults, 1000);
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
        cropping: false,
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

  const handleCreateItem = async () => {
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
          uri: photo,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
        formdata.append('binId', route?.params?.id);
        formdata.append('name', null);
        formdata.append('description', descriptiontext);
        formdata.append('location', locationtext);
        let token = await AsyncStorage.getItem('LoginToken');
        formdata.append('AccessToken', token);
        axios
          .post(AddItemRoute, formdata, {
            headers: {Authorization: 'Bearer ' + token},
          })
          .then(async function (response) {
            if (response?.data?.error === false) {
              await Voice.destroy();
              Voice.removeAllListeners();

              navigation.goBack();
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

  const handleListening = () => {
    if (!isListening) {
      if (isListening2) {
        StopListening();
      } else {
        StartListening2();
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={styles.viewCollectionMain}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={styles.editCollectionContainer}>
            <View style={styles.collectionTextContainerOfAddItem2}>
              <View style={{}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={AppTheme.icons.locationImage}
                    style={styles.locationImage}
                  />
                  <Text style={styles.collectionText}> Location: </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.audioContainer}
                  onPress={handleListening}>
                  {isListening2 ? (
                    <Text style={styles.voiceButtonText}>•••</Text>
                  ) : (
                    <>
                      <Image
                        source={AppTheme.icons.audio}
                        style={{height: 14, width: 14}}
                        resizeMode="contain"
                      />

                      <Text style={styles.audioText}> Record </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{marginTop: -12}}>
                <CustomInput
                  label={''}
                  value={locationtext}
                  onChange={setLocationText}
                  icon={undefined}
                  error={locationerror}
                  placeholder={'Enter location'}
                />
              </View>
            </View>
            <View style={styles.collectionTextContainerOfAddItem2}>
              <View style={{}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={AppTheme.icons.locationImage}
                    style={styles.locationImage}
                  />
                  <Text style={styles.collectionText}>Description: </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.audioContainer}
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
                    <Text style={styles.voiceButtonText}>•••</Text>
                  ) : (
                    <>
                      <Image
                        source={AppTheme.icons.audio}
                        style={{height: 14, width: 14, resizeMode: 'contain'}}
                      />

                      <Text style={styles.audioText}> Record </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{marginTop: -12}}>
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  style={styles.inputContainer2}
                  placeholder="Enter description"
                  placeholderTextColor={'#727582'}
                  value={descriptiontext}
                  onChangeText={text => setDescriptionText(text)}
                />
                {descriptionerror.length > 0 && (
                  <Text style={styles.error}>{descriptionerror}</Text>
                )}
              </View>
            </View>
            <View>
              {imagepath ? (
                <CommonButtonWithIcon
                  title={'Take evidence Photo'}
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
                  <CommonButtonWithIcon
                    title={'Take evidence Photo'}
                    source={AppTheme.icons.camera}
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
                    <Text style={styles.error}>{imageerror}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
          <View>
            <CustomButton
              title={'Create Evidence'}
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

export default AddItem;
