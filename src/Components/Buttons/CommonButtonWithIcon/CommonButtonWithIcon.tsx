import {View, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import AppText from '../../Text/AppText/AppText';
import {CommonButtonStyle} from './CommonButtonWithIcon.style';

const CommonButtonWithIcon = ({
  onPress,
  ImageError,
  title,
  width,
  source,
  style,
}: {
  onPress?: any;
  ImageError?: string;
  title?: string;
  width?: number;
  source?: string | {uri: string};
  style?: any;
}) => {
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = CommonButtonStyle(AppTheme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnContainer,
        {marginBottom: ImageError ? 10 : 20, width: width},
      ]}>
      <View style={styles.btnWithIcon}>
        <Image source={source} style={style} />
        <AppText style={styles.btnWithIcontext} numberOfLines={1}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default CommonButtonWithIcon;
