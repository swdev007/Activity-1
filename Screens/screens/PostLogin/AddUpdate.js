import {
  Text,
  Image,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  CommonBtnForViewItem,
  CommonBtnWithIcon,
  CommonSmallBtn1,
  CustomHeaderNavigation,
  HeaderComponent,
  screenWidth,
} from '../Component/Helper';

import Voice from '@react-native-voice/voice';
import customcss from '../assets/customcss';
import BottomTab from '../../Navigation/BottomTab';

const AddUpdate = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [recognizedText2, setRecognizedText2] = useState('');
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
        <HeaderComponent
          type={'Icon'}
          collection={'Add/Update item'}
          onPress={() => navigation.navigate('Home')}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        style={customcss.viewcollectionmain}>
        <View style={customcss.Editcollectioncont}>
          <View style={customcss.collectiontextcont}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={require('../Component/Image/collection.png')}
                style={customcss.collectionimage}
              />
              <Text style={customcss.collectiontext}>Collection:</Text>
            </View>
            <View
              style={{
                marginLeft: 12,
                justifyContent: 'center',
              }}>
              <Text style={customcss.collectionId}>#76787878877878</Text>
            </View>
          </View>

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
              <Text style={customcss.collectionIdtext} numberOfLines={3}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>

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
              <Text style={customcss.collectionIdtext}>
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
            title={'Take item Photo'}
            source={require('../Component/Image/profilemg.png')}
            style={{
              height: 35,
              width: 35,
              resizeMode: 'contain',
              borderRadius: 35 / 2,
              marginRight: 5,
            }}
            width={screenWidth - 80}
          />

          <View style={customcss.collectiontextcont2}>
            <View style={{}}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../Component/Image/location.png')}
                  style={customcss.locationimage}
                />
                <Text style={customcss.collectiontext}> Location: </Text>
              </View>
              <TouchableOpacity
                style={customcss.audiocont}
                onPress={() => {
                  isListening ? StopListening() : StartListening();
                }}>
                <Image
                  source={require('../Component/Image/audio.png')}
                  style={{height: 14, width: 14, resizeMode: 'contain'}}
                />
                <Text style={customcss.audiotext}> Record </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: -12, marginLeft: 12}}>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={customcss.descriptiontextInput12}
                placeholder="Enter location"
                value={recognizedText}
                onChangeText={text => setRecognizedText(text)}
                placeholderTextColor={'#727582'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              marginBottom: 11,
            }}>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../Component/Image/info.png')}
                  style={customcss.collectionimage}
                />
                <Text style={customcss.collectiontext}> Description: </Text>
              </View>

              <TouchableOpacity
                style={customcss.audiocont}
                onPress={() => {
                  isListening ? StopListening() : StartListening();
                }}>
                <Image
                  source={require('../Component/Image/audio.png')}
                  style={{height: 14, width: 14, resizeMode: 'contain'}}
                />

                <Text style={customcss.audiotext}> Record </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={customcss.descriptiontextInput12}
                placeholder="Enter description"
                placeholderTextColor={'#727582'}
              />
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: -10}}>
          <CommonSmallBtn1
            title={'Save Item'}
            backgroundColor={'#fff'}
            color={'#232529'}
            onPress={sendMessage}
          />
          <CommonSmallBtn1
            title={'Delete Item'}
            backgroundColor={'#1F54FD'}
            color={'#fff'}
          />
        </View>
      </ScrollView>
      <View style={{position: 'absolute', marginTop: 'auto', bottom: -10}}>
        <BottomTab type="home" />
      </View>
    </View>
  );
};

export default AddUpdate;
