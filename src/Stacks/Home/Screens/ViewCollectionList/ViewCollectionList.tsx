import {View} from 'react-native';
import React from 'react';
import {
  CollectionDetail,
  CommonBtnWithIcon,
  HeaderComponent,
  screenWidth,
} from '../../../../../Screens/screens/Component/Helper';
import BottomTab from '../../../../../Screens/Navigation/BottomTab';
import {useSelector} from 'react-redux';
import {ViewCollectionListStyle} from './ViewCollectionList.style';
import {COLLECTION_DETAIL_TYPE} from '../../../../../Screens/enums/collection.enum';
const ViewCollectionList = ({navigation, route}) => {
  console.log(route);
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = ViewCollectionListStyle(AppTheme);
  // const RenderCollectionData = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         flexDirection: 'row',
  //         height: 63,
  //         borderWidth: 1,
  //         borderRadius: 5,
  //         marginBottom: 14,
  //         alignItems: 'center',
  //         paddingLeft: 9,
  //         borderColor: '#E5E8F5',
  //       }}
  //       onPress={() =>
  //         navigation.navigate('ViewItem', {id: route?.params?.id})
  //       }>
  //       <View
  //         style={{
  //           height: 45,
  //           width: 45,
  //           borderRadius: 45 / 2,
  //           backgroundColor: '#E5E8F5',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <Image
  //           source={require('../../Component/Image/profilemg.png')}
  //           style={{height: 45, width: 45, resizeMode: 'contain'}}
  //         />
  //       </View>
  //       <View style={{marginStart: 16}}>
  //         <View style={{flexDirection: 'row'}}>
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               fontFamily: Fonts.Inter,
  //               fontWeight: '500',
  //               color: '#141F42',
  //             }}>
  //             ID :
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               fontFamily: Fonts.Inter,
  //               fontWeight: '700',
  //               color: '#141F42',
  //               marginLeft: 3,
  //             }}>
  //             {item.id}
  //           </Text>
  //         </View>
  //         <View style={{flexDirection: 'row'}}>
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontFamily: Fonts.Inter,
  //               fontWeight: '500',
  //               color: '#727582',
  //             }}>
  //             Location :
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontFamily: Fonts.Inter,
  //               fontWeight: '700',
  //               color: '#727582',
  //             }}>
  //             {' '}
  //             {item.Location}{' '}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={{marginLeft: 'auto', marginRight: 25}}>
  //         <Image
  //           source={require('../../Component/Image/righticon.png')}
  //           style={{height: 10, width: 10, resizeMode: 'contain'}}
  //         />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderComponent
        type={'Icon'}
        collection={'View Case'}
        onPress={() => navigation.navigate('Home')}
        backbtn={'backbtn'}
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
