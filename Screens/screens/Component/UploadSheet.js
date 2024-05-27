import React from 'react';
import {View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableComponent} from './Helper';
import {picOptions} from './CommonListforCamera';
import customcss from '../assets/customcss';

export const UploadSheet = React.forwardRef((props, ref) => (
  <RBSheet
    ref={ref}
    height={190}
    closeOnDragDown
    customStyles={{
      container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    }}>
    <View>
      {picOptions.map(grid => (
        <TouchableComponent
          key={grid.label}
          onPress={() => props.onPress(grid)}
          style={[
            customcss.btnoption,
            {borderBottomWidth: grid.id < 3 ? 1 : 0},
          ]}>
          <View style={customcss.optionsub}>
            {/* <VectorIcon
              name={grid.icon}
              size={27}
              color={Colors.mainColor}
              solid
              style={{marginLeft: 10}}
            /> */}
            <Text style={customcss.optionTxt}>{grid.label}</Text>
          </View>
        </TouchableComponent>
      ))}
    </View>
  </RBSheet>
));
