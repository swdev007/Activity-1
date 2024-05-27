import {
  TextInput,
  Pressable,
  Image,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {HeaderComponent} from '../Component/Helper';
import customcss from '../assets/customcss';
import {
  useTogglePasswordVisibility,
  useTogglePasswordVisibility2,
} from '../PreLogin/useTogglePasswordVisibility';
import VectorIcon from '../Component/vectorIcons';
import BottomTab from '../../Navigation/BottomTab';

const ViewProfile = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const {passwordVisibility2, rightIcon2, handlePasswordVisibility2} =
    useTogglePasswordVisibility2();
  const [isEnabled, setIsEnabled] = useState(false);

  console.log(rightIcon2, 'righticon -->', rightIcon);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'My profile'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        style={customcss.viewcollectionmain}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={customcss.Editcollectioncont22}>
          <View style={{marginTop: 15}}>
            <Text style={customcss.chngepass}> Change Password</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={customcss.nametext}> Password </Text>
            <TextInput
              style={customcss.textinput}
              placeholder="Enter new password"
              placeholderTextColor={'#727582'}
              secureTextEntry={passwordVisibility}
              value={password}
              onChangeText={text => setPassword(text)}
              maxLength={30}
            />
            <Pressable
              style={{
                width: 45,
                position: 'absolute',
                right: 0,
                bottom: 0,
                top: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handlePasswordVisibility}>
              {rightIcon === 'lock' ? (
                <Image
                  source={require('../Component/Image/lock.png')}
                  style={customcss.lockicon}
                />
              ) : (
                <Image
                  source={require('../Component/Image/lock2.png')}
                  style={customcss.lockicon}
                />
              )}
            </Pressable>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={customcss.nametext}> Password </Text>
            <TextInput
              style={customcss.textinput}
              placeholder="Enter new password"
              placeholderTextColor={'#727582'}
              secureTextEntry={passwordVisibility2}
              value={password2}
              onChangeText={text => setPassword2(text)}
              maxLength={30}
            />
            <Pressable
              style={{
                width: 45,
                position: 'absolute',
                right: 0,
                bottom: 0,
                top: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handlePasswordVisibility2}>
              {rightIcon2 === 'lock' ? (
                <Image
                  source={require('../Component/Image/lock.png')}
                  style={customcss.lockicon}
                />
              ) : (
                <Image
                  source={require('../Component/Image/lock2.png')}
                  style={customcss.lockicon}
                />
              )}
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Component/Image/fingerprint.png')}
                style={customcss.fingerprint}
              />
              <Text style={customcss.biometrictxt}> Biometric Mode</Text>
            </View>
            <TouchableOpacity
              style={{
                height: 30,
                width: 40,
                alignItems: 'center',
              }}
              onPress={() => setIsEnabled(!isEnabled)}>
              {isEnabled ? (
                <VectorIcon
                  groupName={'FontAwesome5'}
                  name={'toggle-off'}
                  size={25}
                  color={'#1F54FD'}
                />
              ) : (
                <VectorIcon
                  groupName={'FontAwesome5'}
                  name={'toggle-on'}
                  size={25}
                  color={'#1F54FD'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={customcss.Editcollectioncont22}>
          <View style={customcss.infocont}>
            <Text style={customcss.contacttxt}> Contact info </Text>
          </View>
          <View style={customcss.information}>
            <View style={customcss.informationtxtcont}>
              <Image
                source={require('../Component/Image/email.png')}
                style={customcss.email}
              />
              <Text style={customcss.emailtxt}>Dummy@gmail.com</Text>
            </View>
            <View style={customcss.informationtxtcont}>
              <Image
                source={require('../Component/Image/mobile.png')}
                style={customcss.mobile}
              />
              <Text style={customcss.emailtxt}>+12 123456789 </Text>
            </View>
          </View>
        </View>
        <View style={customcss.Editcollectioncont22}>
          <View style={customcss.infocont}>
            <Text style={customcss.contacttxt}> About inventory tracker </Text>
          </View>
          <View style={customcss.information}>
            <View style={customcss.informationtxtcont}>
              <Image
                source={require('../Component/Image/email.png')}
                style={customcss.email}
              />
              <Text style={customcss.emailtxt}>Help</Text>
            </View>
            <View style={customcss.informationtxtcont}>
              <Image
                source={require('../Component/Image/lock.png')}
                style={customcss.lockicon2}
              />
              <Text style={customcss.emailtxt}>Privacy </Text>
            </View>
            <View style={customcss.informationtxtcont}>
              <Image
                source={require('../Component/Image/document.png')}
                style={customcss.mobile}
              />
              <Text style={customcss.emailtxt}>Terms of service </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomTab type={'home'} />
    </View>
  );
};

export default ViewProfile;
