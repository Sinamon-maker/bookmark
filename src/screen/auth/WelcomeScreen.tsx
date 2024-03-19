import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {Image, StyleSheet, View} from 'react-native';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {colors} from '../../config/colors';
import {AppButton} from '../../modules/ui/AppButton';
import {ButtonLink} from '../../modules/ui/ButtonLink';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationProp} from '../../navigation/stack/AuthStackNavigator';
export const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  return (
    <ScreenWrapper>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[colors.primary, colors.secondary]}
        style={styles.wrap}>
        <View style={styles.imageWrap}>
          <Image
            source={require('../../assets/images/notes.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.btnWrap}>
          <AppButton
            text="Login"
            onPress={() => navigation.navigate('Login')}
            background={colors.secondary}
          />
          <AppButton
            text="Register"
            onPress={() => navigation.navigate('Signup')}
          />
          <ButtonLink
            text="Forget password"
            onPress={() => navigation.navigate('Reset')}
          />
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 4,
    height: '100%',
  },
  imageWrap: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 4,
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 24,
  },
  btnWrap: {
    gap: 10,
  },
});
