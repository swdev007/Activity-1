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
          collection={'View collection'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={customcss.viewcollectionmain}>
        <CollectionDetail
          item={'item'}
          onPress={() =>
            navigation.navigate('AddUpdate', {id: route?.params?.id})
          }
          id={route?.params?.id}
        />
        <View style={{marginTop: 20}}>
          <CommonBtnWithIcon
            title={'Take item Photo'}
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
            title={'item Location'}
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
            title={'Item Description'}
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
            title={'Save Item'}
            backgroundColor={'#fff'}
            color={'#232529'}
          />
          <CommonSmallBtn1
            title={'Delete Item'}
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
