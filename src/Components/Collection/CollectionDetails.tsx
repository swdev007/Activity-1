import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {StoreInterface} from '../../Redux/Store';
import {GetCollectionDetails} from '../../Services/Auth/apiRoutes';
import {useSelector} from 'react-redux';
import {CollectionDetailsStyle} from './CollectionDetails.style';
import {CommonBtnForViewItem} from '../../../Screens/screens/Component/Helper';

export interface CollectionDetailType {
  case_id: string;
  case_number: string;
  created_at: string;
  created_by: string;
  description: string;
  location: string;
  name: string;
  notes: string;
  status: string;
  updated_at: string;
  updated_by: string;
  user_id: string;
}
export function CollectionDetail({
  item,
  onPress,
  id,
  binId,
  binlocation,
  bindescription,
  image,
  name,
  createby,
  updatedby,
  type,
}: any) {
  const [collectiondetail, setCollectionDetail] = useState<
    CollectionDetailType | undefined
  >();
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = CollectionDetailsStyle(AppTheme);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      GetCollectionDetailsFuc();
    }
  }, [isFocused]);

  const GetCollectionDetailsFuc = async () => {
    let token = await AsyncStorage.getItem('LoginToken');
    // add token
    axios
      .post(
        GetCollectionDetails,
        {
          collectionId: id,
        },
        {
          headers: {Authorization: 'Bearer ' + token},
        },
      )
      .then(function (response) {
        setCollectionDetail(response.data.data);
      })
      .catch(function (error) {
        console.log('error of get detail', error);
      });
  };
  return (
    <View style={styles.collectionConainer}>
      <CollectionDetailUnit
        label={binId ? 'Evidence Name:' : 'Case:'}
        data={binId ? `#${binId}` : collectiondetail?.case_number}
        icon={AppTheme.icons.collection}
      />
      {name && (
        <CollectionDetailUnit
          label={'Name:'}
          data={name}
          icon={AppTheme.icons.collection}
        />
      )}
      <CollectionDetailUnit
        label={'Description:'}
        data={bindescription ? bindescription : collectiondetail?.description}
        icon={AppTheme.icons.info}
      />

      {item ? (
        <CommonBtnForViewItem onPress={onPress} />
      ) : (
        <CollectionDetailUnit
          label={'Location:'}
          data={binlocation ? binlocation : collectiondetail?.location}
          icon={AppTheme.icons.locationImage}
        />
      )}
      {createby ? (
        <CollectionDetailUnit
          label={'Created By:'}
          data={createby}
          icon={AppTheme.icons.info}
        />
      ) : (
        <></>
      )}
      {updatedby ? (
        <CollectionDetailUnit
          label={'Updated By:'}
          data={updatedby}
          icon={AppTheme.icons.info}
        />
      ) : (
        <></>
      )}
      {image ? (
        <CollectionDetailUnit
          label={'Image:'}
          data={undefined}
          icon={AppTheme.icons.camera}
          image={image}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

export const CollectionDetailUnit = ({
  label,
  data,
  icon,
  image,
}: {
  label: string;
  data: string;
  icon: any;
  image?: any;
}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = CollectionDetailsStyle(AppTheme);
  return !image ? (
    <View style={styles.collectionTextContainer}>
      <View style={styles.labelWithImageContainer}>
        <Image source={icon} style={styles.collectionImage} />
        <Text style={styles.collectionText}>{label}</Text>
      </View>
      <View
        style={{
          marginLeft: 12,
          justifyContent: 'center',
        }}>
        <Text style={styles.collectionIdText} numberOfLines={3}>
          {data}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.collectionImageContainer}>
      <View style={{marginBottom: 'auto'}}>
        <View style={styles.labelWithImageContainer}>
          <Image
            source={AppTheme.icons.camera}
            style={styles.collectionImage}
          />
          <Text style={styles.collectionText}>{label}</Text>
        </View>
      </View>
      {image ? (
        <Image
          source={{uri: image}}
          style={styles.collectionInputImage}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={AppTheme.icons.placeholder}
          style={styles.collectionInputImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
};
