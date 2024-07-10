import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {EvidenceListItemCardStyle} from './EvidenceListItemCard.style';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../Redux/Store';

const EvidenceListItemCard = ({
  item,
  navigateToItem,
  handleImagePress,
}: {
  item: any;
  navigateToItem: any;
  handleImagePress: any;
}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = EvidenceListItemCardStyle(AppTheme);
  return (
    <TouchableOpacity
      style={styles.collectionDataItemContainer}
      onPress={() => navigateToItem()}>
      <TouchableOpacity
        style={styles.imagePressableWrapper}
        onPress={() => handleImagePress(item)}>
        <Image
          source={{
            uri: item?.image_url
              ? item?.image_url
              : 'https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/03/placeholder.png',
          }}
          style={styles.itemImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <View style={styles.itemKeyValueContainer}>
          <Text style={styles.itemIdKey}>ID :</Text>
          <Text style={styles.itemIdValue}>{item.evidence_id}</Text>
        </View>
        <View style={styles.itemKeyValueContainer}>
          <Text style={styles.itemLocationKey}>Location :</Text>
          <Text style={styles.itemLocationValue} numberOfLines={1}>
            {item?.location}{' '}
          </Text>
        </View>
      </View>
      <View style={styles.rightIconContainer}>
        <Image
          source={AppTheme.icons.rightIcon}
          style={styles.rightIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default EvidenceListItemCard;
