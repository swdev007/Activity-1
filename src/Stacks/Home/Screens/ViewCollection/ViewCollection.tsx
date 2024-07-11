import {View, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {CommonBtnWithIcon} from '../../../../../Screens/screens/Component/Helper';
import {GetCollectionDetails} from '../../../../../Screens/screens/Component/Api';
import axios from 'axios';
import BottomTab from '../../../../../Screens/Navigation/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ViewCollectionStyle} from './ViewCollection.style';
import {useSelector} from 'react-redux';
import {CollectionDetail} from '../../../../Components/Collection/CollectionDetails';
import {COLLECTION_DETAIL_TYPE} from '../../../../Enums/collection.enum';
import {LoadingComponent} from '../../../../Components/Modals/LoadingComponent/LoadingComponent';
import {RouteList} from '../../../../Components/Headers/RouteList/RouteList';
import {CustomHeader} from '../../../../Components/Headers/CustomHeader/CustomHeader';

const ViewCollection = ({navigation, route}) => {
  const [collectiondetail, setCollectionDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [screens, setscreens] = useState([]);
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = ViewCollectionStyle(AppTheme);
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetCollectionDetailsFuc();
    }
  }, [isFocused]);

  const GetCollectionDetailsFuc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');

    axios
      .post(
        GetCollectionDetails,
        {
          collectionId: route?.params?.id,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(function (response) {
        setCollectionDetail(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('error of get detail', error);
        setLoading(false);
      });
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <View style={styles.root}>
      <View>
        <CustomHeader
          type={'Icon'}
          collection={'View case'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />
        <RouteList data={screens} currentname={route.name} />
      </View>
      <ScrollView style={styles.viewCollectionMain}>
        <CollectionDetail
          id={route?.params?.id}
          name={collectiondetail?.name || ''}
          type={COLLECTION_DETAIL_TYPE.CASE}
        />
        <View style={styles.buttonWrapper}>
          <CommonBtnWithIcon
            title={'Warrant List'}
            source={AppTheme.icons.eye}
            style={styles.eyeIcon}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('BinList', {
                id: route?.params?.id,
                screenName: 'ViewCollection',
              })
            }
          />
          <CommonBtnWithIcon
            title={'Back to Case'}
            source={AppTheme.icons.lock}
            style={styles.lockIcon}
            width={screenWidth - 40}
            onPress={() => navigation.pop(1)}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomWrapper}>
        <BottomTab />
      </View>
    </View>
  );
};

export default ViewCollection;
