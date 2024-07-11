import {Text, View, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  HeaderComponent,
  CommonBtn1,
} from '../../../../../Screens/screens/Component/Helper';
import {
  useTogglePasswordVisibility,
  useTogglePasswordVisibility2,
} from '../../../../../Screens/screens/PreLogin/useTogglePasswordVisibility';
import BottomTab from '../../../BottomTab/BottomTab';
import {AuthService} from '../../../../Services/Auth/auth.service';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../Redux/Store';
import {ProfileStyle} from './Profile.style';
import CustomInput from '../../../../Components/CustomInput/CustomInput';
import {ProfileDetailsCard} from '../../../../Components/Cards/ProfileDetailCard/ProfileDetailCard';
import {CommonButton2} from '../../../../Components/Buttons/CommonButton2/CommonButton2';
import {CustomHeader} from '../../../../Components/Headers/CustomHeader/CustomHeader';

const authService = new AuthService();
const ViewProfile = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = ProfileStyle(AppTheme);
  const onChangePassword = (text: string) => {
    if (!authService.checkIfItIsAValidPassword(text)) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
    setPassword(text);
  };

  const onChangeConfirmPassword = (text: string) => setPassword2(text);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await authService.getProfile();
        if (response.data.error === false) {
          setDetails(response.data.data);
        } else {
          toast.show(response.data.message, {
            type: 'danger',
            placement: 'top',
          });
        }
      } catch (error) {
        toast.show(error.message, {
          type: 'danger',
          placement: 'top',
        });
      }
    };

    getUserDetails();
  }, [toast]);

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

  const contactInfromationDetails = useCallback(
    () => [
      {
        icon: AppTheme.icons.mobile,
        text: (details?.first_name || '') + (details?.last_name || ''),
        iconStyle: styles.mobile,
      },
      {
        icon: AppTheme.icons.email,
        text: details?.email || '',
        iconStyle: styles.emailIcon,
      },
    ],
    [details],
  );

  const aboutSwipeDetails = [
    {
      icon: AppTheme.icons.email,
      text: 'Help',
      iconStyle: styles.emailIcon,
    },
    {
      icon: AppTheme.icons.lock,
      text: 'Privacy',
      iconStyle: styles.lockIcon2,
    },
    {
      icon: AppTheme.icons.document,
      text: 'Terms of service',
      iconStyle: styles.mobile,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <CustomHeader
          type={'Icon'}
          collection={'My profile'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        style={styles.viewCollectionMain}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.editCollectionContainer22}>
          <View style={{marginTop: 15}}>
            <Text style={styles.changePassword}> Change Password</Text>
          </View>

          <CustomInput
            label={'Current Password'}
            value={password}
            onChange={onChangePassword}
            icon={AppTheme.icons.lock}
            hide={true}
            error={''}
            placeholder={'Enter current password'}
          />

          <CustomInput
            label={'New Password'}
            value={password2}
            onChange={onChangeConfirmPassword}
            icon={AppTheme.icons.lock}
            hide={true}
            error={''}
            placeholder={'Enter new password'}
          />

          <View style={styles.buttonContainer}>
            <CommonButton2
              onPress={() => changePassword()}
              title={'Change password'}
              loading={loading}
              color={'#fff'}
            />
          </View>
        </View>

        <ProfileDetailsCard
          title={'Contact information'}
          data={contactInfromationDetails()}
        />

        <ProfileDetailsCard title={'About SWIPE'} data={aboutSwipeDetails} />
      </ScrollView>
      <BottomTab type={'home'} />
    </View>
  );
};

export default ViewProfile;
