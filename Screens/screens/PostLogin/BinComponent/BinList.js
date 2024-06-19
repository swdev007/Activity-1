import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {GetBinList} from '../../Component/Api';
import axios from 'axios';
import {Fonts} from '../../Component/Colors';
import {
  CustomHeaderNavigation,
  HeaderComponent,
  Loadingcomponent,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import BottomTab from '../../../Navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BinList = ({route, navigation}) => {
  const [collectiondata, setCollectionData] = useState();
  const [loading, setLoading] = useState(false);
  const [screens, setscreens] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetCollectionListFunc();
    }
  }, [isFocused]);
  const GetCollectionListFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetBinList,
        {
          collectionId: route?.params?.id,
        },
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        console.log(response.data.data);
        setCollectionData(response?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('error of get Collection list =>', error);
        setLoading(false);
      });
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
          navigation.navigate('WarrantDetails', {
            id: item?.warrant_id,
            screenPath: item?.bin_name,
          })
        }>
        <View
          style={{
            height: 45,
            width: 45,
            borderRadius: 45 / 2,
            backgroundColor: '#E5E8F5',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../Component/Image/lock.png')}
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
              {item?.bin_name}
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
            source={require('../../Component/Image/righticon.png')}
            style={{height: 10, width: 10, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Home'}
          collection={'Warrant List'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>

      <View style={customcss.collectionlistui}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.Inter,
            fontWeight: '600',
            color: '#141F42',
            marginBottom: 13,
          }}>
          Warrant List
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={collectiondata}
          renderItem={(item, index) => RenderCollectionData(item, index)}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 5,
          }}
        />
      </View>
      <BottomTab type={'home'} />
    </View>
  );
};

export default BinList;
