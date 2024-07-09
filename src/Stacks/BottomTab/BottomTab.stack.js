import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import customcss from '../../../Screens/screens/assets/customcss';
import {screenWidth} from '../../../Screens/screens/Component/Helper';
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
              source={require('../../Assets/Images/profile.png')}
              style={customcss.profiletab}
            />
          </View>
          <View>
            <Text style={customcss.text1}> My Profile </Text>
          </View>
        </TouchableOpacity>

        <View style={{justifyContent: 'center', bottom: 18}}>
          <View style={customcss.profiletabcont}>
            <Image
              source={require('../../Assets/Images/help.png')}
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
