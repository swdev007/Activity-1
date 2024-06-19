import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CollectionDetail,
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  Loadingcomponent,
  screenWidth,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import {GetCollectionDetails} from '../../Component/Api';
import axios from 'axios';
import BottomTab from '../../../Navigation/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewCollection = ({navigation, route}) => {
  const [collectiondetail, setCollectionDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [screens, setscreens] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetCollectionDetailsFuc();
    }
  }, [isFocused]);

  const GetCollectionDetailsFuc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');

    axios
      .post(
        GetCollectionDetails,
        {
          collectionId: route?.params?.id,
        },
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        setCollectionDetail(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('error of get detail', error);
        setLoading(false);
      });
  };
  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'View collection'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView style={customcss.viewcollectionmain}>
        <CollectionDetail id={route?.params?.id} />
        <View style={{marginTop: 15}}>
          <CommonBtnWithIcon
            title={'Edit Collection'}
            source={require('../../Component/Image/edit.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('EditCollection', {
                id: route?.params?.id,
                sendData: collectiondetail,
              })
            }
          />
          {/* <CommonBtnWithIcon
            title={'View Item'}
            source={require('../../Component/Image/eye.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('ViewCollectionList', {id: route?.params?.id})
            }
            // onPress={() =>
            //   navigation.navigate('BinList', {id: route?.params?.id})
            // }
          /> */}

          <CommonBtnWithIcon
            title={'Bin List'}
            source={require('../../Component/Image/eye.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('BinList', {
                id: route?.params?.id,
                screenName: 'ViewCollection',
              })
            }
          />
          <CommonBtnWithIcon
            title={'Back to Collection'}
            source={require('../../Component/Image/lock.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() => navigation.pop(1)}
          />
          {/* <CommonBtnWithIcon
            title={'Print collection Report'}
            source={require('../../Component/Image/print.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
          /> */}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', marginTop: 'auto', bottom: -8}}>
        <BottomTab />
      </View>
    </View>
  );
};

export default ViewCollection;
