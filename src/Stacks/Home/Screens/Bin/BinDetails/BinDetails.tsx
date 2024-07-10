import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  Loadingcomponent,
  screenWidth,
} from '../../../../../../Screens/screens/Component/Helper';
import {GetBinDetails} from '../../../../../Services/Auth/apiRoutes';
import axios from 'axios';
import BottomTab from '../../../../BottomTab/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {BinDetailStyle} from './BinDetails.style';
import {CollectionDetail} from '../../../../../Components/Collection/CollectionDetails';

const BinDetails = ({route, navigation}) => {
  // console.log(route);
  const [bindetails, setBinDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const isfocused = useIsFocused();
  const [screens, setscreens] = useState([]);
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = BinDetailStyle(AppTheme);
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
        {headers: {Authorization: 'Bearer ' + token}},
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
          collection={'View Warrant'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView style={styles.viewCollectionMain}>
        <CollectionDetail
          binId={bindetails?.bin_name}
          binlocation={bindetails?.location}
          bindescription={bindetails?.description}
        />

        <View style={{marginTop: 15}}>
          <CommonBtnWithIcon
            title={'Back to Warrant List'}
            source={AppTheme.icons.lock}
            style={styles.commonButtonWithIcon}
            width={screenWidth - 40}
            onPress={() => navigation.pop(1)}
          />
          <CommonBtnWithIcon
            title={'Evidence List'}
            source={AppTheme.icons.eye}
            style={styles.commonButtonWithIcon}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('GetItemListOfBin', {id: route?.params?.id})
            }
          />
          <CommonBtnWithIcon
            title={'Add Evidence'}
            source={AppTheme.icons.addItem}
            style={[styles.commonButtonWithIcon, {tintColor: '#1F54FD'}]}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('AddNewItem', {id: route?.params?.id})
            }
          />
        </View>
      </ScrollView>
      <View style={styles.bottomTabWrapper}>
        <BottomTab />
      </View>
    </View>
  );
};

export default BinDetails;
