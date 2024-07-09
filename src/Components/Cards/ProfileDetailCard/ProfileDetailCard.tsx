import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../Redux/Store';
import {ProfileDetailCardStyle} from './ProfileDetailCard.style';

export interface DetailDataType {
  icon: any;
  text: string;
  iconStyle: any;
}
export interface ProfileDetailCardPropsType {
  title: string;
  data: DetailDataType[];
}
export const ProfileDetailsCard = ({
  title,
  data,
}: ProfileDetailCardPropsType) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = ProfileDetailCardStyle(AppTheme);
  return (
    <View style={styles.profileDetailCardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {data?.map((item: DetailDataType) => {
        return (
          <View style={styles.detailUnit}>
            <View style={styles.detailUnitInnerContainer}>
              <Image
                source={item.icon}
                style={item.iconStyle ?? {}}
                resizeMode="contain"
              />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
