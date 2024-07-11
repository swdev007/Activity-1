import React from 'react';
import {View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {picOptions} from '../../Constants/CommonListForCamera';
import {StoreInterface} from '../../Redux/Store';
import {TouchableComponent} from '../Buttons/TouchableComponent/TouchableComponent';
import {UploadSheetStyle} from './UploadSheet.style';

export const UploadSheet = React.forwardRef((props: any, ref) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = UploadSheetStyle(AppTheme);
  return (
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
              styles.btnOption,
              {borderBottomWidth: grid.id < 3 ? 1 : 0},
            ]}>
            <View style={styles.optionSub}>
              {/* <VectorIcon
              name={grid.icon}
              size={27}
              color={Colors.mainColor}
              solid
              style={{marginLeft: 10}}
            /> */}
              <Text style={styles.optionText}>{grid.label}</Text>
            </View>
          </TouchableComponent>
        ))}
      </View>
    </RBSheet>
  );
});
