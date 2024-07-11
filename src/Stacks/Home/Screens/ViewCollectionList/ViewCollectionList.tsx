import {Dimensions, View} from 'react-native';
import {
  CollectionDetail,
  CommonBtnWithIcon,
} from '../../../../../Screens/screens/Component/Helper';
import BottomTab from '../../../../../Screens/Navigation/BottomTab';
import {useSelector} from 'react-redux';
import {ViewCollectionListStyle} from './ViewCollectionList.style';
import {COLLECTION_DETAIL_TYPE} from '../../../../Enums/collection.enum';
import {CustomHeader} from '../../../../Components/Headers/CustomHeader/CustomHeader';
const ViewCollectionList = ({navigation, route}) => {
  const screenWidth = Dimensions.get('window').width;
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = ViewCollectionListStyle(AppTheme);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <CustomHeader
        type={'Icon'}
        collection={'View Case'}
        onPress={() => navigation.navigate('Home')}
        backbtn="backbtn"
        onHandleBack={() => navigation.goBack()}
      />
      <View style={styles.viewCollectionMain}>
        <View>
          <CollectionDetail
            id={route?.params?.id}
            type={COLLECTION_DETAIL_TYPE.CASE}
          />
        </View>
        <View style={styles.btnWrapper}>
          <CommonBtnWithIcon
            title={'View Warrant'}
            source={AppTheme.icons.eye}
            style={styles.viewWarrantButton}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('BinList', {id: route?.params?.id})
            }
          />
        </View>
      </View>
      <View>
        <BottomTab />
      </View>
    </View>
  );
};

export default ViewCollectionList;
