import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../Redux/Store';
import {BottomTabStyle} from './BottomTab.style';

const BottomTab = ({type}: {type?: any}) => {
  const navigation: any = useNavigation();
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = BottomTabStyle(AppTheme);
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.root}>
      <View
        style={{
          ...styles.buttonContainer,
          marginHorizontal: type === 'home' ? screenWidth / 6 : screenWidth / 4,
        }}>
        <TouchableOpacity
          style={styles.buttonWrap}
          onPress={() => navigation.navigate('ViewProfile')}>
          <View style={styles.profileTabContainer}>
            <Image
              source={AppTheme.icons.profile}
              style={styles.profileTab}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.text1}> My Profile </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonWrap}>
          <View style={styles.profileTabContainer}>
            <Image
              source={AppTheme.icons.help}
              style={styles.helpTab}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.text1}> Help </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomTab;
