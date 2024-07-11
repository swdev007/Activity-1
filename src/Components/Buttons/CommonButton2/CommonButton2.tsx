import {ActivityIndicator, Dimensions, View} from 'react-native';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../Redux/Store';
import AppText from '../../Text/AppText/AppText';
import {TouchableComponent} from '../TouchableComponent/TouchableComponent';
import {CommonButton2Style} from './CommonButton2.style';

export function CommonButton2({onPress, loading, title, color}) {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = CommonButton2Style(AppTheme);
  const screenWidth = Dimensions.get('window').width;
  return (
    <TouchableComponent onPress={onPress} style={styles.btnContainer}>
      <View style={styles.btnSub}>
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <AppText style={[styles.btnText, {color: color}]}>{title}</AppText>
        )}
      </View>
    </TouchableComponent>
  );
}
