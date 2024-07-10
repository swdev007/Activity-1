import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {UpdateDeleteBinItemStyle} from './UpdateDeleteBinItem.styles';

export const UpdateEvidenceTextAndRecordUnit = ({
  label,
  icon,
  name,
  recordAction,
  isListening,
  onInputChange,
  inputValue,
  error,
}: {
  label: string;
  icon: any;
  name: string;
  recordAction: any;
  isListening: boolean;
  onInputChange: any;
  inputValue: string;
  error: any;
}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = UpdateDeleteBinItemStyle(AppTheme);
  console.log('inputValue ', label, ' ', inputValue);

  return (
    <View style={styles.collectionTextContainerOfAddItem2}>
      <View>
        <View style={styles.textAndRecordContainer}>
          <Image source={icon} style={styles.locationImage} />
          <Text style={styles.collectionText}> {label} </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.audioContainer}
          onPress={() => {
            recordAction();
          }}>
          {isListening ? (
            <Text style={styles.voiceButtonText}>•••</Text>
          ) : (
            <>
              <Image
                source={AppTheme.icons.audio}
                style={styles.basicIcon}
                resizeMode="contain"
              />

              <Text style={styles.audioText}> Record </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={{marginTop: -12}}>
        <TextInput
          textAlignVertical="top"
          multiline={true}
          style={styles.inputContainer2}
          placeholder="Enter location"
          value={inputValue}
          onChangeText={text => onInputChange(text)}
          placeholderTextColor={'#727582'}
        />
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};
