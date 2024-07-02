import {
  TextInput,
  Pressable,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {HeaderComponent} from '../Component/Helper';
import customcss from '../assets/customcss';
import {
  useTogglePasswordVisibility,
  useTogglePasswordVisibility2,
} from '../PreLogin/useTogglePasswordVisibility';
import BottomTab from '../../Navigation/BottomTab';
import {AuthService} from '../../services/auth.service';
import {CommonBtn1} from '../Component/Helper';
import {useToast} from 'react-native-toast-notifications';

const authService = new AuthService();
const ViewProfile = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const {passwordVisibility2, rightIcon2, handlePasswordVisibility2} =
    useTogglePasswordVisibility2();
  const [isEnabled, setIsEnabled] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      if (
        !password ||
        !password2 ||
        !authService.checkIfItIsAValidPassword(password) ||
        !authService.checkIfItIsAValidPassword(password2)
      ) {
        return;
      }
      setLoading(true);
      const res = await authService.changePassword(password, password2);
      setLoading(false);
      if (res.data.error === true) {
        toast.show(res.data.message, {
          type: 'danger',
          placement: 'top',
        });
      } else {
        toast.show('Password updated successfully!', {
          type: 'success',
          placement: 'top',
        });
        setPassword('');
        setPassword2('');
        setIsEnabled(false);
      }
    } catch (error) {
      setLoading(false);
      toast.show(error.message, {
        type: 'danger',
        placement: 'top',
      });
    }
  };
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
            <Text style={customcss.nametext}>Current Password </Text>
            <TextInput
              style={customcss.textinput}
              placeholder="Enter current password"
              placeholderTextColor={'#727582'}
              secureTextEntry={passwordVisibility}
              value={password}
              onChangeText={text => {
                if (!authService.checkIfItIsAValidPassword(text)) {
                  setIsEnabled(false);
                } else {
                  setIsEnabled(true);
                }
                setPassword(text);
              }}
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
            <Text style={customcss.nametext}>New Password </Text>
            <TextInput
              style={customcss.textinput}
              placeholder="Enter new password"
              placeholderTextColor={'#727582'}
              secureTextEntry={passwordVisibility2}
              value={password2}
              onChangeText={text => setPassword2(text)}
              maxLength={30}
              editable={isEnabled ? true : false}
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

          <View style={{marginTop: 20, marginBottom: 20}}>
            <CommonBtn1
              title={'Change Password'}
              onPress={loading ? () => {} : () => changePassword()}
              color={'#fff'}
              loading={loading}
            />
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
            <Text style={customcss.contacttxt}> About SWIPE </Text>
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
