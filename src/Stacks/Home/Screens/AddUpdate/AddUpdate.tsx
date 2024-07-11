import {
  Text,
  Image,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useState, useEffect} from 'react';
import {
  CommonBtnForViewItem,
  CommonBtnWithIcon,
  CommonSmallBtn1,
} from '../../../../../Screens/screens/Component/Helper';

import Voice from '@react-native-voice/voice';
import BottomTab from '../../../BottomTab/BottomTab';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../Redux/Store';
import {AddUpdateStyle} from './AddUpdate.style';
import {RouteList} from '../../../../Components/Headers/RouteList/RouteList';
import {CustomHeader} from '../../../../Components/Headers/CustomHeader/CustomHeader';

const AddUpdate = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [recognizedText2, setRecognizedText2] = useState('');
  const [screens, setscreens] = useState([]);
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = AddUpdateStyle(AppTheme);
  let screenWidth = Dimensions.get('window').width;
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

  const onSpeechResults = event => {
    console.log('onSpeech Result ==>', event);
    const text = event.value[0];
    const text2 = event.value[0];
    setRecognizedText(text);
    setRecognizedText2(text2);
  };

  const StartListening = async () => {
    setIsListening(true);
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
    } catch (error) {
      console.log('Error at StopListening', error);
    }
  };

  const sendMessage = () => {
    if (recognizedText) {
      setMessages([
        ...messages,
        {text: recognizedText, text2: recognizedText2, sender: 'user'},
      ]);
      setRecognizedText('');
      setRecognizedText2('');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <CustomHeader
          type={'Icon'}
          collection={'Add/Update evidence'}
          onPress={() => navigation.navigate('Home')}
        />

        <RouteList data={screens} currentname={route.name} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        style={styles.viewCollectionMain}>
        <View style={styles.editCollectionContainer}>
          <View style={styles.collectionTextContainer}>
            <View style={styles.collectionImageContainer}>
              <Image
                source={AppTheme.icons.collection}
                style={styles.collectionImage}
                resizeMode="contain"
              />
              <Text style={styles.collectionText}>Case:</Text>
            </View>
            <View style={styles.collectionIdContainer}>
              <Text style={styles.collectionId}>#76787878877878</Text>
            </View>
          </View>

          <View style={styles.collectionTextContainer}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={AppTheme.icons.info}
                style={styles.collectionImage}
                resizeMode="contain"
              />
              <Text style={styles.collectionText}>Description:</Text>
            </View>
            <View
              style={{
                marginLeft: 12,
                justifyContent: 'center',
              }}>
              <Text style={styles.collectionIdText} numberOfLines={3}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>

          <View style={styles.collectionTextContainer}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={AppTheme.icons.locationImage}
                style={styles.collectionImage}
              />
              <Text style={styles.collectionText}>Location:</Text>
            </View>
            <View style={styles.collectionIdTextConatiner}>
              <Text style={styles.collectionIdText}>
                San Francisco California USA
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 9}}>
            <CommonBtnForViewItem
              onPress={() =>
                navigation.navigate('ViewCollectionList', {
                  id: route?.params?.id,
                })
              }
            />
          </View>
          <CommonBtnWithIcon
            title={'Take evidence Photo'}
            source={AppTheme.icons.profileImage}
            style={styles.commonBtnWithIcon}
            width={screenWidth - 80}
          />

          <View style={styles.collectionTextContainer2}>
            <View style={{}}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Image
                  source={AppTheme.icons.locationImage}
                  resizeMode="contain"
                  style={styles.locationImage}
                />
                <Text style={styles.collectionText}> Location: </Text>
              </View>
              <TouchableOpacity
                style={styles.audioContainer}
                onPress={() => {
                  isListening ? StopListening() : StartListening();
                }}>
                <Image
                  source={AppTheme.icons.audio}
                  style={styles.audioImage}
                  resizeMode="contain"
                />
                <Text style={styles.audioText}> Record </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.locationInputConatiner}>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={styles.descriptionTextInput12}
                placeholder="Enter location"
                value={recognizedText}
                onChangeText={text => setRecognizedText(text)}
                placeholderTextColor={'#727582'}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View>
              <View style={styles.infoImageConatiner}>
                <Image
                  source={AppTheme.icons.info}
                  resizeMode="contain"
                  style={styles.collectionImage}
                />
                <Text style={styles.collectionText}> Description: </Text>
              </View>

              <TouchableOpacity
                style={styles.audioContainer}
                onPress={() => {
                  isListening ? StopListening() : StartListening();
                }}>
                <Image
                  source={AppTheme.icons.audio}
                  style={styles.audioImage}
                  resizeMode="contain"
                />

                <Text style={styles.audioText}> Record </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={styles.descriptionTextInput12}
                placeholder="Enter description"
                placeholderTextColor={'#727582'}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonConatiner}>
          <CommonSmallBtn1
            title={'Save Evidence'}
            backgroundColor={'#fff'}
            color={'#232529'}
            onPress={sendMessage}
          />
          <CommonSmallBtn1
            title={'Delete Evidence'}
            backgroundColor={'#1F54FD'}
            color={'#fff'}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomTabContainer}>
        <BottomTab type="home" />
      </View>
    </View>
  );
};

export default AddUpdate;
