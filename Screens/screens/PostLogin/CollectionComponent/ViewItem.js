import {View} from 'react-native';
import React from 'react';
import {
  CollectionDetail,
  CommonBtnWithIcon,
  CommonSmallBtn1,
  HeaderComponent,
  screenWidth,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import BottomTab from '../../../Navigation/BottomTab';

const ViewItem = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'View case'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={customcss.viewcollectionmain}>
        <CollectionDetail
          item={'evidence'}
          onPress={() =>
            navigation.navigate('AddUpdate', {id: route?.params?.id})
          }
          id={route?.params?.id}
        />
        <View style={{marginTop: 20}}>
          <CommonBtnWithIcon
            title={'Take Evidence Photo'}
            source={require('../../Component/Image/camera.png')}
            style={{
              height: 17,
              width: 17,
              resizeMode: 'contain',
              marginRight: 4,
            }}
            width={screenWidth - 40}
          />
          <CommonBtnWithIcon
            title={'Evidence Location'}
            source={require('../../Component/Image/location.png')}
            style={{
              height: 17,
              width: 17,
              resizeMode: 'contain',
              marginRight: 4,
            }}
            width={screenWidth - 40}
          />
          <CommonBtnWithIcon
            title={'Evidence Description'}
            source={require('../../Component/Image/audio2.png')}
            style={{
              height: 17,
              width: 17,
              resizeMode: 'contain',
              marginRight: 4,
            }}
            width={screenWidth - 40}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CommonSmallBtn1
            title={'Save Evidence'}
            backgroundColor={'#fff'}
            color={'#232529'}
          />
          <CommonSmallBtn1
            title={'Delete Evidence'}
            backgroundColor={'#1F54FD'}
            color={'#fff'}
          />
        </View>
      </View>
      <View style={{position: 'absolute', marginTop: 'auto', bottom: 0}}>
        <BottomTab />
      </View>
    </View>
  );
};

export default ViewItem;
