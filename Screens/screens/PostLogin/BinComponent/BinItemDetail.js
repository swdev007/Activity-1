import {ScrollView, View} from 'react-native';
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
import {GetItemDetails} from '../../Component/Api';
import axios from 'axios';
import BottomTab from '../../../Navigation/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BinItemDetail = ({navigation, route}) => {
  const [bindetails, setBinDetails] = useState();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 4];
  const [screens, setscreens] = useState([]);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetBinDetailsFunc();
    }
  }, [isFocused]);
  const GetBinDetailsFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetItemDetails,
        {
          itemId: route?.params?.id,
        },
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        if (response?.data.error === false) {
          console.log(response.data.data);
          setBinDetails(response?.data?.data);
          setLoading(false);
        } else {
          console.log(response.data);
          console.log('responsedata at get Bin detail', response?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log('error of get detail', error);
        setLoading(false);
      });
  };

  const HandleNavigation = () => {
    if (prevRoute.name === 'BinDetails') {
      navigation.pop(3);
    } else {
      navigation.pop(2);
    }
  };

  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Item detail'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView style={customcss.viewcollectionmain}>
        <CollectionDetail
          binId={route.params.id}
          binlocation={bindetails?.location}
          bindescription={bindetails?.description}
          image={bindetails?.image_url}
          createby={bindetails?.created_by}
          updatedby={bindetails?.updated_by}
          // name={bindetails?.name}
        />
        <View style={{marginTop: 15}}>
          <CommonBtnWithIcon
            title={'Edit Item'}
            source={require('../../Component/Image/edit.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('UpdateDeleteBinItem', {
                id: route?.params?.id,
                sendData: bindetails,
              })
            }
          />
          <CommonBtnWithIcon
            title={'Back to Bin'}
            source={require('../../Component/Image/eye.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() => HandleNavigation()}
          />
          {/* <CommonBtnWithIcon
            title={'Lock Bin'}
            source={require('../../Component/Image/lock.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
          /> */}
          {/* <CommonBtnWithIcon
            title={'Add Item'}
            source={require('../../Component/Image/print.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('AddNewItem', {id: route?.params?.id})
            }
          /> */}
          {/* <CommonBtnWithIcon
            title={'Print Bin Report'}
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
      <BottomTab type={'home'} />
    </View>
  );
};

export default BinItemDetail;
