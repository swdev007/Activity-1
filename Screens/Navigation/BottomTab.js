import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import customcss from '../screens/assets/customcss';
import {screenWidth} from '../screens/Component/Helper';
import {useNavigation} from '@react-navigation/native';

const BottomTab = ({type, typeofid}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: screenWidth,
        height: 80,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginStart: 30,
          marginEnd: 35,
          justifyContent: 'space-between',
          marginHorizontal: type === 'home' ? screenWidth / 6 : screenWidth / 4,
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', bottom: 18}}
          onPress={() => navigation.navigate('ViewProfile')}>
          <View style={customcss.profiletabcont}>
            <Image
              source={require('../screens/Component/Image/profile.png')}
              style={customcss.profiletab}
            />
          </View>
          <View>
            <Text style={customcss.text1}> My Profile </Text>
          </View>
        </TouchableOpacity>
        {/* {type === 'home' ? null : (
          <TouchableOpacity
            style={{bottom: 25}}
            onPress={() => navigation.navigate('AddNewItem', {id: typeofid})}>
            <View style={customcss.addtabcont}>
              <Image
                source={require('../screens/Component/Image/additem.png')}
                style={customcss.addtab}
              />
            </View>
            <Text style={customcss.text2}> Add item </Text>
          </TouchableOpacity>
        )} */}
        <View style={{justifyContent: 'center', bottom: 18}}>
          <View style={customcss.profiletabcont}>
            <Image
              source={require('../screens/Component/Image/help.png')}
              style={customcss.helptab}
            />
          </View>
          <View>
            <Text style={customcss.text1}> Help </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomTab;
