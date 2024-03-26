import React from 'react';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {FormChangeEmail} from '../../components/auth/FormChangeEmail';
import {AppButton} from '../../modules/ui/AppButton';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenNavigationProp} from '../../navigation/stack/SettingsStackNavigator';
import {ImageLogoComponent} from '../../components/auth/ImageLogoComponent';

export const ChangeEmailScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <ImageLogoComponent />
        <FormChangeEmail />
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
    gap: 16,
    padding: 10,
  },
});
