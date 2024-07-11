import {
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../Redux/Store';
import {UploadImageModalStyle} from './UploadImageModal.style';
export const UploadImageModal = ({
  modalVisible,
  updateModalVisibility,
  imagepath,
  fallbackUri,
  button1Handler,
  button2Handler,
  isImageChange,
  isUploading,
}: {
  modalVisible: boolean;
  updateModalVisibility: any;
  imagepath: any;
  fallbackUri: string;
  button1Handler: any;
  button2Handler: any;
  isImageChange: boolean;
  isUploading: boolean;
}) => {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = UploadImageModalStyle(AppTheme);
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          updateModalVisibility(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AutoHeightImage
              width={screenWidth}
              source={{uri: imagepath ? imagepath : fallbackUri}}
              fallbackSource={fallbackUri.toString()}
            />
            <TouchableOpacity
              style={styles.modalVisiblebtn}
              onPress={() => updateModalVisibility(false)}>
              <VectorIcon
                groupName={'Entypo'}
                name={'cross'}
                size={24}
                color={'#000'}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.modalButtonContainer,
                isImageChange && {
                  flexDirection: 'row',
                  width: screenWidth,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.modalButton1,
                  {
                    width: isImageChange ? '46%' : '100%',
                    alignItems: 'center',
                    justifyContent: isImageChange ? 'flex-start' : 'center',
                  },
                ]}
                onPress={() => {
                  //   HandleCamera(1);
                  button1Handler();
                }}>
                <Image
                  source={AppTheme.icons.camera}
                  style={styles.cameraIcon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Update New Image</Text>
              </TouchableOpacity>
              {isImageChange ? (
                <TouchableOpacity
                  style={styles.modalButton2}
                  onPress={() => button2Handler()}>
                  {isUploading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.buttonText}>upload file </Text>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
