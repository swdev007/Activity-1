import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {CommonSmallBtn1} from '../../../../../../Screens/screens/Component/Helper';
import Voice from '@react-native-voice/voice';
import BottomTab from '../../../../BottomTab/BottomTab';
import axios from 'axios';
import {DeleteItem, updateItem} from '../../../../../Services/Auth/apiRoutes';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {UpdateDeleteBinItemStyle} from './UpdateDeleteBinItem.styles';
import {UploadSheet} from '../../../../../Components/UploadSheet/UploadSheet';
import {RouteList} from '../../../../../Components/Headers/RouteList/RouteList';
import {CustomHeader} from '../../../../../Components/Headers/CustomHeader/CustomHeader';
import CommonButtonWithIcon from '../../../../../Components/Buttons/CommonButtonWithIcon/CommonButtonWithIcon';

const UpdateDeleteBinItem = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isListening2, setIsListening2] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [locationtext, setLocationText] = useState(
    route?.params?.sendData?.location,
  );
  const [descriptiontext, setDescriptionText] = useState(
    route?.params?.sendData?.description,
  );
  const [imagepath, setImagePath] = useState(
    route?.params?.sendData?.image_url,
  );
  const [descriptionerror, setDescriptionError] = useState('');
  const [locationerror, setLocationError] = useState('');
  const [screens, setscreens] = useState([]);
  const picoptionref = useRef<any>();
  let lastButtonPressRef = useRef(null);
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = UpdateDeleteBinItemStyle(AppTheme);
  let screenWidth = Dimensions.get('window').width;
  const setUpVoice = async () => {
    if (await Voice.isAvailable()) {
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = StopListening;
      Voice.onSpeechResults = debounce(onSpeechResults, 1000);
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
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
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
          .post(updateItem, formdata, {
            headers: {Authorization: 'Bearer ' + token},
          })
          .then(async function (response) {
            if (response?.data?.error == false) {
              await Voice.destroy();
              Voice.removeAllListeners();
              navigation.navigate('BinItemDetail', {id: route?.params?.id});
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
    Alert.alert(
      'Delete Evidence',
      'Are you sure, you want to delete the evidence',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => DeleteItemFun()},
      ],
    );
  };

  const DeleteItemFun = async () => {
    const token = await AsyncStorage.getItem('LoginToken');
    setDeleteLoading(true);
    axios
      .post(
        DeleteItem,
        {itemId: route?.params?.id},
        {headers: {Authorization: 'Bearer ' + token}},
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
  const recordAction = () => {
    if (!isListening) {
      if (isListening2) {
        StopListening();
      } else {
        StartListening2();
      }
    }
  };

  const recordAction2 = () => {
    if (!isListening2) {
      if (isListening) {
        StopListening();
      } else {
        StartListening();
      }
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <CustomHeader
          type={'Icon'}
          collection={'Update evidence'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <RouteList data={screens} currentname={route.name} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={styles.viewCollectionMain}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          <View style={styles.editCollectionContainer}>
            <UpdateEvidenceTextAndRecordUnit
              label={'Location'}
              icon={AppTheme.icons.locationImage}
              name={''}
              recordAction={recordAction}
              isListening={isListening2}
              onInputChange={setLocationText}
              inputValue={locationtext ?? ''}
              error={locationerror}
            />
            <UpdateEvidenceTextAndRecordUnit
              label={'Description'}
              icon={AppTheme.icons.locationImage}
              name={''}
              recordAction={recordAction2}
              isListening={isListening}
              onInputChange={setDescriptionText}
              inputValue={descriptiontext}
              error={descriptionerror}
            />
            <View>
              {imagepath ? (
                <CommonButtonWithIcon
                  title={'Take evidence Photo djk'}
                  source={{uri: imagepath}}
                  style={styles.commonIconButtonStyle}
                  width={screenWidth - 80}
                  onPress={() => HandleCamera(1)}
                />
              ) : (
                <CommonButtonWithIcon
                  title={'Take Evidence Photo'}
                  source={AppTheme.icons.camera}
                  style={styles.commonIconButtonStyle}
                  width={screenWidth - 80}
                  onPress={() => HandleCamera(1)}
                />
              )}
            </View>
          </View>

          <View style={styles.smallButtonContainer}>
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
      <View style={styles.bottomTabContainer}>
        <BottomTab type={'home'} />
      </View>
      <UploadSheet ref={picoptionref} onPress={grid => HandleCamera(grid)} />
    </View>
  );
};

export const UpdateEvidenceTextAndRecordUnit = ({
  label,
  icon,
  name,
  recordAction,
  isListening,
  onInputChange,
  inputValue,
  error,
}: {
  label: string;
  icon: any;
  name: string;
  recordAction: any;
  isListening: boolean;
  onInputChange: any;
  inputValue: string;
  error: any;
}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = UpdateDeleteBinItemStyle(AppTheme);
  console.log('inputValue ', label, ' ', inputValue);

  return (
    <View style={styles.collectionTextContainerOfAddItem2}>
      <View>
        <View style={styles.textAndRecordContainer}>
          <Image source={icon} style={styles.locationImage} />
          <Text style={styles.collectionText}> {label} </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.audioContainer}
          onPress={() => {
            recordAction();
            // isListening2 ? StopListening() : StartListening2();
          }}>
          {isListening ? (
            <Text style={styles.voiceButtonText}>•••</Text>
          ) : (
            <>
              <Image
                source={AppTheme.icons.audio}
                style={styles.basicIcon}
                resizeMode="contain"
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
          placeholder="Enter location"
          value={inputValue}
          onChangeText={text => onInputChange(text)}
          placeholderTextColor={'#727582'}
        />
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default UpdateDeleteBinItem;
