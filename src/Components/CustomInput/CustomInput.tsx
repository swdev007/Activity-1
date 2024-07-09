import {useState} from 'react';
import {View, Text, TextInput, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {CustomInputStyle} from './CustomInput.style';

const CustomInput = ({
  label,
  value,
  onChange,
  icon,
  error,
  placeholder,
  hide = false,
}: {
  label: string;
  value: string;
  onChange: (str: string) => void;
  icon: any;
  error: any;
  placeholder: string;
  hide?: boolean;
}) => {
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const [visibility, setVisisbiltiy] = useState(!hide);
  const styles = CustomInputStyle(AppTheme);

  const toggleVisibility = () => {
    setVisisbiltiy(prev => !prev);
  };
  return (
    <>
      <View style={styles.inputInnerContainer}>
        <Text style={styles.nameText}> {label}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={AppTheme.colors.greyDark}
          value={value}
          onChangeText={onChange}
          secureTextEntry={hide && visibility}
          maxLength={30}
        />

        {!hide ? (
          <Image source={icon} style={styles.icon} />
        ) : visibility ? (
          <Pressable onPress={toggleVisibility}>
            <Image source={AppTheme.icons.lock} style={styles.lockicon} />
          </Pressable>
        ) : (
          <Pressable onPress={toggleVisibility}>
            <Image source={AppTheme.icons.unLock} style={styles.lockicon} />
          </Pressable>
        )}
      </View>
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default CustomInput;
