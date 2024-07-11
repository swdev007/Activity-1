import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../Redux/Store';
import Modal from 'react-native-modal';
import {LoadingComponentStyle} from './LoadingComponent.style';
import {ActivityIndicator, View} from 'react-native';
export function LoadingComponent() {
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = LoadingComponentStyle(AppTheme);
  return (
    <Modal
      isVisible={true}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          animating={true}
          color={AppTheme.colors.mainColor}
          size="large"
        />
      </View>
    </Modal>
  );
}
