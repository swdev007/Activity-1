import {View, Text} from 'react-native';
import React from 'react';

const AppText = ({
  style,
  children,
  numberOfLines,
  onPress,
}: {
  style: any;
  children?: any;
  numberOfLines?: number;
  onPress?: any;
}) => {
  return (
    <Text style={style} numberOfLines={numberOfLines} onPress={onPress}>
      {children}
    </Text>
  );
};

export default AppText;
