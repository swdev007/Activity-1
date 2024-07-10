import {View} from 'react-native';
import React from 'react';
import {
  CollectionDetail,
  CommonBtnWithIcon,
  CommonSmallBtn1,
  HeaderComponent,
  screenWidth,
} from '../../../../../Screens/screens/Component/Helper';
import BottomTab from '../../../BottomTab/BottomTab';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../Redux/Store';
import {ViewItemStyle} from './ViewItem.style';
import {COLLECTION_DETAIL_TYPE} from '../../../../../Screens/enums/collection.enum';

const ViewItem = ({navigation, route}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = ViewItemStyle(AppTheme);
  return (
    <View style={styles.root}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'View case'}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.viewCollectionMain}>
        <CollectionDetail
          item={'evidence'}
          onPress={() =>
            navigation.navigate('AddUpdate', {id: route?.params?.id})
          }
          id={route?.params?.id}
          type={COLLECTION_DETAIL_TYPE.ITEM}
        />
        <View style={styles.buttonConatiner}>
          <CommonBtnWithIcon
            title={'Take Evidence Photo'}
            source={AppTheme.icons.camera}
            style={styles.camerWithIconButtonIcon}
            width={screenWidth - 40}
          />
          <CommonBtnWithIcon
            title={'Evidence Location'}
            source={AppTheme.icons.locationImage}
            style={styles.camerWithIconButtonIcon}
            width={screenWidth - 40}
          />
          <CommonBtnWithIcon
            title={'Evidence Description'}
            source={AppTheme.icons.audio2}
            style={styles.camerWithIconButtonIcon}
            width={screenWidth - 40}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <CommonSmallBtn1
            title={'Save Evidence'}
            backgroundColor={'#fff'}
            color={'#232529'}
          />
          <CommonSmallBtn1
            title={'Delete Evidence'}
            backgroundColor={'#1F54FD'}
            color={'#fff'}
          />
        </View>
      </View>
      <View style={styles.bottomTabContainer}>
        <BottomTab />
      </View>
    </View>
  );
};

export default ViewItem;
