import React, {useState} from 'react';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {View, Image, StyleSheet} from 'react-native';
import {FormLogin} from '../../components/auth/FormLogin';
import {colors} from '../../config/colors';
import {AppButton} from '../../modules/ui/AppButton';
import {FormResetPassword} from '../../components/auth/FormResetPassword';
import {FormNewPassword} from '../../components/auth/FormNewPassword';
import {AuthScreenNavigationProp} from '../../navigation/stack/AuthStackNavigator';
import {useNavigation} from '@react-navigation/native';

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [newPasswordForm, setNewPasswordForm] = useState(true);
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <View style={styles.imageWrap}>
          <Image
            source={require('../../assets/images/notes.png')}
            style={styles.image}
          />
        </View>
        {newPasswordForm ? <FormNewPassword /> : <FormResetPassword />}
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
