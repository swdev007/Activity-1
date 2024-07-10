import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  Loadingcomponent,
  screenWidth,
} from '../../../../../../Screens/screens/Component/Helper';
import {GetItemDetails} from '../../../../../Services/Auth/apiRoutes';
import axios from 'axios';
import BottomTab from '../../../../BottomTab/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {BinItemDetailStyle} from './BinItemDetail.style';
import {COLLECTION_DETAIL_TYPE} from '../../../../../../Screens/enums/collection.enum';
import {CollectionDetail} from '../../../../../Components/Collection/CollectionDetails';

export interface BinDetailsType {
  location: string;
  description: string;
  image_url: string;
  created_by: string;
  updated_by: string;
}
const BinItemDetail = ({navigation, route}) => {
  const [bindetails, setBinDetails] = useState<BinDetailsType | undefined>();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 4];
  const [screens, setscreens] = useState([]);
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  let styles = BinItemDetailStyle(AppTheme);

  const GetBinDetailsFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetItemDetails,
        {
          itemId: route?.params?.id,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(function (response) {
        if (response?.data.error === false) {
          setBinDetails(response?.data?.data);
          setLoading(false);
        } else {
          console.log('responsedata at get Warrant detail', response?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log('error of get detail', error);
        setLoading(false);
      });
  };

  const HandleNavigation = () => {
    if (prevRoute.name === 'WarrantDetails') {
      navigation.pop(3);
    } else {
      navigation.pop(2);
    }
  };

  const editEvidence = () => {
    navigation.navigate('UpdateDeleteBinItem', {
      id: route?.params?.id,
      sendData: bindetails,
    });
  };

  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetBinDetailsFunc();
    }
  }, [isFocused]);

  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={styles.root}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Evidence detail'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>
      <ScrollView style={styles.viewCollectionMain}>
        <CollectionDetail
          binId={route.params.id}
          binlocation={bindetails?.location}
          bindescription={bindetails?.description}
          image={bindetails?.image_url}
          createby={bindetails?.created_by}
          updatedby={bindetails?.updated_by}
          type={COLLECTION_DETAIL_TYPE.ITEM}
        />
        <View style={{marginTop: 15}}>
          <CommonBtnWithIcon
            title={'Edit Evidence'}
            source={AppTheme.icons.edit}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() => {
              editEvidence();
            }}
          />
          <CommonBtnWithIcon
            title={'Back to Warrant'}
            source={AppTheme.icons.eye}
            style={styles.eyeIcon}
            width={screenWidth - 40}
            onPress={() => HandleNavigation()}
          />
        </View>
      </ScrollView>
      <BottomTab type={'home'} />
    </View>
  );
};

export default BinItemDetail;
