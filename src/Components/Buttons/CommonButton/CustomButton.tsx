import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {CustomButtonStyle} from './CustomButton.style';

interface CustomButtonProps {
  onPress: any;
  title: string;
  backgroundColor?: string;
  color?: string;
  loading: boolean;
  disable?: boolean;
}

const CustomButton = ({
  onPress,
  title,
  backgroundColor,
  color,
  loading,
  disable = false,
}: CustomButtonProps) => {
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);

  const styles = CustomButtonStyle(AppTheme);
  const onPressHandle = () => {
    if (!disable) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandle}
      style={[styles.btnContainer, {backgroundColor: backgroundColor}]}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={[styles.btnText, {color: color}]} onPress={onPress}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
