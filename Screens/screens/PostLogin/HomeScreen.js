import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts} from '../Component/Colors';
import {HeaderComponent, Loadingcomponent} from '../Component/Helper';
import customcss from '../assets/customcss';
import BottomTab from '../../Navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {GetCollectionList} from '../Component/Api';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const [useremail, setUserEmailData] = useState('');
  const [collectiondata, setCollectionData] = useState();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      GetCollectionListFunc();
    }
  }, [isFocused]);

  // var utcTime = moment().utc();
  // console.log('clksjklshckldshclksd' + utcTime.format('hh:mm'));

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const GetCollectionListFunc = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    let UserEmail = await AsyncStorage.getItem('UserEmail');

    if (UserEmail) {
      setLoading(true);
      axios
        .post(GetCollectionList, {
          AccessToken: token,
        })
        .then(function (response) {
          setUserEmailData(UserEmail);
          setCollectionData(response?.data?.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log('error of get Collection list =>', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
        onPress={() => navigation.navigate('ViewCollection', {id: item?.id})}>
        <View
          style={{
            height: 45,
            width: 45,
            borderRadius: 45 / 2,
            backgroundColor: '#E5E8F5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // onPress={() => navigation.navigate('AddCollectionList')}
        >
          <Image
            source={require('../Component/Image/lock.png')}
            style={{height: 24, width: 24, resizeMode: 'contain'}}
          />
        </View>
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
              {item?.id}
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
                textAlign: 'left',
              }}
              numberOfLines={1}>
              {' '}
              {item?.location}{' '}
            </Text>
          </View>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 25}}>
          <Image
            source={require('../Component/Image/righticon.png')}
            style={{height: 10, width: 10, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <HeaderComponent
        type={'Text'}
        name={useremail}
        collection={'collection list'}
      />
      <View style={customcss.collectionlistui}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.Inter,
            fontWeight: '600',
            color: '#141F42',
            marginBottom: 13,
          }}>
          Collection List
        </Text>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={collectiondata}
          renderItem={(item, index) => RenderCollectionData(item, index)}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 5,
          }}
        />
      </View>
      <View style={{position: 'absolute', marginTop: 'auto', bottom: 0}}>
        <BottomTab type={'home'} />
      </View>
    </View>
  );
};

export default HomeScreen;
