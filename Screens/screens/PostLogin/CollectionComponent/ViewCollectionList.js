import {View} from 'react-native';
import React from 'react';
import {
  CollectionDetail,
  CommonBtnWithIcon,
  HeaderComponent,
  screenWidth,
} from '../../Component/Helper';
import customcss from '../../assets/customcss';
import BottomTab from '../../../Navigation/BottomTab';

const ViewCollectionList = ({navigation, route}) => {
  console.log(route);
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
      <View style={customcss.viewcollectionmain1}>
        <View>
          <CollectionDetail id={route?.params?.id} />
        </View>

        {/* <View style={{flex: 1, marginTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={CollectionData}
            keyExtractor={item => item.id.toString()}
            renderItem={(item, index) => RenderCollectionData(item, index)}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 'auto',
            }}
          />
        </View> */}
        <View style={{marginTop: 20, marginBottom: 20}}>
          <CommonBtnWithIcon
            title={'Edit Case'}
            source={require('../../Component/Image/edit.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('EditCollection', {
                id: route?.params?.id,
                sendData: collectiondetail,
              })
            }
          />
          <CommonBtnWithIcon
            title={'View Warrant'}
            source={require('../../Component/Image/eye.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              marginRight: 3,
            }}
            width={screenWidth - 40}
            onPress={() =>
              navigation.navigate('WarrantList', {id: route?.params?.id})
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
