import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';

import ImagePicker from 'react-native-image-crop-picker';
import {UploadSheet} from '../../../../../../Screens/screens/Component/UploadSheet';
import {
  CommonBtnWithIcon,
  CustomHeaderNavigation,
  HeaderComponent,
  screenWidth,
} from '../../../../../../Screens/screens/Component/Helper';
import {GetItemList, updateItem} from '../../../../../Services/Auth/apiRoutes';
import axios from 'axios';

import BottomTab from '../../../../BottomTab/BottomTab';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetItemListOfBinStyle} from './GetItemListOfBin.style';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {UploadImageModal} from '../../../../../Components/Modals/UploadImageModal/UploadImageModal';
import EvidenceListItemCard from '../../../../../Components/Cards/EvidenceListCard/EvidenceListCard';
export interface ImageUrlByIdType {
  image: string;
  location: string;
  description: string;
  binId: any;
  name: string;
}

export interface EvidenceType {
  case_id: string;
  created_at: string;
  created_by: string;
  description: string;
  evidence_id: number;
  image_url: string;
  location: string;
  updated_at: string;
  updated_by: string;
  warrant_id: number;
}

const GetItemListOfBin = ({route, navigation}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = GetItemListOfBinStyle(AppTheme);
  const [bindata, setBinData] = useState([]);
  const [imageurlbyid, setImageUrlById] = useState<
    ImageUrlByIdType | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [isuploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isimagechange, setIsImageChange] = useState(false);
  const [imagepath, setImagePath] = useState('');
  const picoptionref = useRef<any>();
  const isfocused = useIsFocused();
  const [screens, setscreens] = useState([]);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isfocused) {
      GetBinItemFunc();
    }
  }, [isfocused]);

  const GetBinItemFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetItemList,
        {
          binId: route?.params?.id,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(function (response) {
        setBinData(response?.data?.data);
        setIsImageChange(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      if (route?.params?.screenName === 'AddItem') {
        navigation.pop(2);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation, route?.params?.screenName]);

  const HandleBackNavigation = () => {
    if (route?.params?.screenName === 'AddItem') {
      navigation.pop(2);
    } else {
      navigation.pop(1);
    }
  };
  const HandleImageFunc = (item: EvidenceType) => {
    if (imagepath) {
      setImagePath('');
    }
    setImageUrlById({
      image: item?.image_url,
      location: item?.location,
      description: item?.description,
      binId: item?.evidence_id,
      name: item?.description,
    });
    setTimeout(() => {
      setModalVisible(true);
    }, 200);
  };

  const RenderCollectionData = ({item, index}) => {
    const navigateToItem = () => {
      navigation.navigate('BinItemDetail', {id: item?.evidence_id});
    };
    return (
      <EvidenceListItemCard
        item={item}
        navigateToItem={navigateToItem}
        handleImagePress={() => HandleImageFunc(item)}
      />
    );
  };

  const RenderEmptyComponent = () => {
    return (
      <View style={styles.emptyListConatiner}>
        <View>
          <Text style={styles.noItemText}> No Evidence Data </Text>
        </View>
        <View style={styles.noItemSectionButtonWrapper}>
          <CommonBtnWithIcon
            title={'Add Evidence'}
            onPress={() =>
              navigation.navigate('AddNewItem', {id: route?.params?.id})
            }
            source={AppTheme.icons.addItem}
            style={styles.addNewItemButton}
            width={screenWidth - 40}
          />
        </View>
      </View>
    );
  };

  const HandleCamera = grid => {
    if (grid === 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        if (image.size > 10000000) {
          alert('File size is greater than 10 Mb');
        } else {
          console.log(image);
          setImagePath(image.path);
          setIsImageChange(true);
          picoptionref.current.close();
        }
      });
    } else if (grid === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        setImagePath(image.path);
        setIsImageChange(true);
        picoptionref.current.close();
      });
    } else {
      picoptionref.current.close();
    }
  };

  const handleCreateItem = async () => {
    setIsUploading(true);
    if (imagepath) {
      setLoading(true);
      let photo = {uri: imagepath};
      let formdata = new FormData();
      formdata.append('image_url', {
        uri: photo.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      const token = await AsyncStorage.getItem('LoginToken');
      formdata.append('itemId', imageurlbyid?.binId);
      formdata.append('name', imageurlbyid?.name);
      formdata.append('description', imageurlbyid?.description);
      formdata.append('location', imageurlbyid?.location);
      formdata.append('AccessToken', token);
      axios
        .post(updateItem, formdata, {
          headers: {Authorization: 'Bearer ' + token},
        })
        .then(function (response) {
          if (response?.data?.error == false) {
            setIsUploading(false);
            setModalVisible(false);
            setIsImageChange(false);
            GetBinItemFunc();
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log('errror', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View style={styles.root}>
      <View>
        <HeaderComponent
          type={'Icon'}
          collection={'Evidence List'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => HandleBackNavigation()}
        />
        <CustomHeaderNavigation data={screens} currentname={route.name} />
      </View>

      <View style={styles.viewCollectionMain1}>
        <View style={styles.evidenceListContainer}>
          <CommonBtnWithIcon
            title={'Add Evidence'}
            onPress={() =>
              navigation.navigate('AddNewItem', {id: route?.params?.id})
            }
            source={AppTheme.icons.addItem}
            style={{
              tintColor: '#1F54FD',
              height: 13,
              width: 13,
              resizeMode: 'contain',
              marginRight: 8,
            }}
            width={screenWidth - 40}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={bindata}
            keyExtractor={item => item?.evidence_id}
            renderItem={(item: any) => RenderCollectionData(item)}
            ListEmptyComponent={() => RenderEmptyComponent()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 'auto',
            }}
          />
        </View>
      </View>

      {modalVisible ? (
        <UploadImageModal
          modalVisible={modalVisible}
          updateModalVisibility={(el: boolean) => setModalVisible(el)}
          imagepath={imagepath}
          fallbackUri={imageurlbyid.image ?? ''}
          button1Handler={() => {
            console.log('handling');
            HandleCamera(1);
          }}
          button2Handler={() => handleCreateItem()}
          isImageChange={isimagechange}
          isUploading={isuploading}
        />
      ) : (
        <></>
      )}
      <BottomTab type={'home'} />
      <UploadSheet ref={picoptionref} />
    </View>
  );
};

export default GetItemListOfBin;
