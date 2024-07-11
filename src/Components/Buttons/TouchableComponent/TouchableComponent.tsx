import {TouchableOpacity} from 'react-native';

export function TouchableComponent({
  onPress,
  style,
  children,
  onLongPress,
  hitSlop,
  onPressIn,
}: {
  onPress?: any;
  style?: any;
  children?: React.ReactElement;
  onLongPress?: any;
  hitSlop?: any;
  onPressIn?: any;
}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
      hitSlop={hitSlop}
      onPressIn={onPressIn}>
      {children}
    </TouchableOpacity>
  );
}
