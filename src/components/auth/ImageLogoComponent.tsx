import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const ImageLogoComponent = () => {
  return (
    <View style={styles.imageWrap}>
      <Image
        source={require('../../assets/images/picture4.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 14,
    marginBottom: 14,
  },
});
