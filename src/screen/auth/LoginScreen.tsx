import React, {useState} from 'react';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {BaseInput} from '../../modules/ui/BaseInput';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconsNames} from '../../config/constants';
import {FormLogin} from '../../components/auth/FormLogin';
import {AppButton} from '../../modules/ui/AppButton';
import {colors} from '../../config/colors';
import {AuthScreenNavigationProp} from '../../navigation/stack/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {ImageLogoComponent} from '../../components/auth/ImageLogoComponent';

export const LoginScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <ImageLogoComponent />

        <FormLogin />
        <AppButton
          text="Cancel"
          background={colors.secondary}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.superLight,
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 16,
    padding: 10,
  },
});
