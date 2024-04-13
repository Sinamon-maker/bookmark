import React from 'react';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {View, StyleSheet} from 'react-native';

import {colors} from '../../config/colors';
import {AppButton} from '../../modules/ui/AppButton';
import {FormResetPassword} from '../../components/auth/FormResetPassword';
import {AuthScreenNavigationProp} from '../../navigation/stack/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {ImageLogoComponent} from '../../components/auth/ImageLogoComponent';

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <ImageLogoComponent />
        {<FormResetPassword />}
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
