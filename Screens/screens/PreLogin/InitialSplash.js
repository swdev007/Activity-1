import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const InitialSplash = () => {
  const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('SplashScreen');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#D6DEFF'}}>
      <View style={{alignItems: 'flex-end'}}>
        <Image source={require('../Component/Image/cloud1.png')} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Component/Image/splashlogo.png')}
          style={{height: 203, width: '50%', resizeMode: 'contain'}}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../Component/Image/cloud2.png')}
          style={{
            height: 220,
            width: '30%',
          }}
        />
        <Image
          source={require('../Component/Image/splashlogo2.png')}
          style={{
            height: 200,
            width: '30%',
            resizeMode: 'contain',
            position: 'absolute',
            left: '50%',
            top: '30%',
            transform: [{translateX: -50}],
          }}
        />
      </View>
    </View>
  );
};

export default InitialSplash;
