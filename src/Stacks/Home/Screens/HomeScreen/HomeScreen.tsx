import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  HeaderComponent,
  Loadingcomponent,
} from '../../../../../Screens/screens/Component/Helper';
import BottomTab from '../../../../../Screens/Navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {GetCollectionList} from '../../../../../Screens/screens/Component/Api';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {HomeScreenStyle} from './HomeScreen.style';

const HomeScreen = ({navigation}) => {
  const [useremail, setUserEmailData] = useState('');
  const [collectiondata, setCollectionData] = useState();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = HomeScreenStyle(AppTheme);
  useEffect(() => {
    if (isFocused) {
      GetCollectionListFunc();
    }
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const GetCollectionListFunc = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    let UserEmail = await AsyncStorage.getItem('UserEmail');

    if (UserEmail) {
      setLoading(true);
      axios
        .post(
          GetCollectionList,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(function (response) {
          setUserEmailData(UserEmail);
          setCollectionData(response?.data?.data);

          setLoading(false);
        })
        .catch(function (error) {
          console.log('error of get Case list =>', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const RenderCollectionData = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={styles.collectionUnitWrapper}
        onPress={() =>
          navigation.navigate('ViewCollection', {id: item?.case_id})
        }>
        <View
          style={styles.lockImageWrapper}
          // onPress={() => navigation.navigate('AddCollectionList')}
        >
          <Image
            source={AppTheme.icons.lock}
            style={styles.lockImage}
            resizeMode="contain"
          />
        </View>
        <View style={{marginStart: 16}}>
          <View style={styles.dataFields}>
            <Text style={styles.caseInitialText}># :</Text>
            <Text style={styles.caseNumber}>{item?.case_number}</Text>
          </View>
          <View style={styles.dataFields}>
            <Text style={styles.locationInitial}>Location :</Text>
            <Text style={styles.location} numberOfLines={1}>
              {' '}
              {item?.location}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.rightIconWrapper}>
          <Image
            source={AppTheme.icons.rightIcon}
            style={styles.rightIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };
  return loading ? (
    <Loadingcomponent />
  ) : (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <HeaderComponent
        type={'Text'}
        name={useremail}
        collection={'case list'}
      />
      <View style={styles.collectionListUi}>
        <Text style={styles.caseListHeaderText}>Case List</Text>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={collectiondata}
          renderItem={(item: any) => RenderCollectionData(item)}
          keyExtractor={item => item.case_id}
          contentContainerStyle={styles.collectionListContainer}
        />
      </View>
      <View style={styles.bottomTabWrapper}>
        <BottomTab type={'home'} />
      </View>
    </View>
  );
};

export default HomeScreen;
