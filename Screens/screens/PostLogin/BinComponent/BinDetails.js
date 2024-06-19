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
import {GetBinDetails} from '../../Component/Api';
import axios from 'axios';
import customcss from '../../assets/customcss';
import BottomTab from '../../../Navigation/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BinDetails = ({route, navigation}) => {
  // console.log(route);
  const [bindetails, setBinDetails] = useState();
  const [loading, setLoading] = useState(false);
  const isfocused = useIsFocused();
  const [screens, setscreens] = useState([]);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isfocused) {
      GetBinDetailsFunc();
    }
  }, [isfocused]);

  const GetBinDetailsFunc = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    setLoading(true);
    axios
      .post(
        GetBinDetails,
        {
          binId: route?.params?.id,
        },
        {headers: {Authorization: token}},
      )
      .then(function (response) {
        console.log(response.data.data);
        setBinDetails(response.data.data);
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
          collection={'View Bin'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView style={customcss.viewcollectionmain}>
        <CollectionDetail
          binId={bindetails?.warrant_id}
          binlocation={bindetails?.location}
          bindescription={bindetails?.description}
        />
        <View style={{marginTop: 15}}>
          <CommonBtnWithIcon
            title={'Edit Bin'}
            source={require('../../Component/Image/edit.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('EditBin', {
                id: route?.params?.id,
                sendData: bindetails,
                screenPath: 'Edit Bin',
              })
            }
          />
          <CommonBtnWithIcon
            title={'Bin List'}
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
          <CommonBtnWithIcon
            title={'Item List'}
            source={require('../../Component/Image/eye.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('GetItemListOfBin', {id: route?.params?.id})
            }
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
          <CommonBtnWithIcon
            title={'Add Item'}
            source={require('../../Component/Image/additem.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
              tintColor: '#1F54FD',
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('AddNewItem', {id: route?.params?.id})
            }
          />
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
      <View style={{position: 'absolute', marginTop: 'auto', bottom: -8}}>
        <BottomTab />
      </View>
    </View>
  );
};

export default BinDetails;
