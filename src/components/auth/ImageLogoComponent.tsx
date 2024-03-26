import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const ImageLogoComponent = () => {
  return (
    <View style={styles.imageWrap}>
      <Image
        source={require('../../assets/images/notes.png')}
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
    width: 48,
    height: 48,
    marginTop: 24,
  },
});
