import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import VectorIcon from '../../Icons/VectorIcons/VectorIcons';

import AppText from '../../Text/AppText/AppText';
import {RouteListStyle} from './RouteList.style';

export function RouteList({data, currentname}) {
  const AppTheme = useSelector((store: any) => store.theme.AppTheme);
  const styles = RouteListStyle(AppTheme);

  const getName = (name: string) => {
    switch (name) {
      case 'ViewCollection': {
        return 'View Case';
      }
      case 'BinList': {
        return 'Warrant List';
      }
      case 'BinDetails': {
        return 'Warrant Evidence';
      }
      case 'GetItemListOfBin': {
        return 'Evidence List';
      }
      default: {
        return name;
      }
    }
  };
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 10, paddingHorizontal: 15}}
        key={'2'}
        // horizontal
        numColumns={4}
        data={data}
        renderItem={({item}) => (
          <>
            {item.name !== currentname ? (
              <View style={styles.list}>
                <AppText style={{color: AppTheme.colors.black}}>
                  {getName(item.name)}
                </AppText>
                <VectorIcon groupName={'AntDesign'} name={'right'} />
              </View>
            ) : null}
          </>
        )}
      />
    </View>
  );
}
