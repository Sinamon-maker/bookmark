import React, {useEffect} from 'react';
import {IconsNames} from '../../config/constants';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {ButtonLink} from '../../modules/ui/ButtonLink';
import {IconComponent} from '../../modules/ui/IconComponent';
import {Text, View} from 'react-native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {StyleSheet} from 'react-native';
import {SettingsScreenNavigationProp} from '../../navigation/stack/SettingsStackNavigator';
import {useNavigation} from '@react-navigation/native';
import useSignout from '../../api/useSignout';
import {ErrorComponent} from '../../modules/common/ErrorComponent';
import userStore from '../../store/userStore';
import auth from '@react-native-firebase/auth';

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const user = userStore(s => s.user);
  const setUser = userStore(s => s.setUser);
  const {err, signout, loading} = useSignout();

  useEffect(() => {
    const subscriber = auth().onUserChanged(userState => {
      if (userState !== null) {
        setUser(userState);
      } else {
        setUser(null);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [setUser]);

  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <View style={styles.avatarContent}>
          <View style={styles.avatarWrap}>
            <IconComponent
              iconName={IconsNames.ACCOUNT}
              size={50}
              color={colors.secondary}
            />
          </View>
          <Text style={styles.avatarText}>{user?.displayName}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
        <ErrorComponent message={err} />
        <ButtonLink
          text="logout"
          onPress={() => signout()}
          color={colors.primary}
        />
        <ButtonLink
          text="change email"
          onPress={() => navigation.navigate('ChangeEmail')}
          color={colors.primary}
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
  },
  avatarContent: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrap: {
    borderWidth: 4,
    padding: 4,
    borderColor: colors.secondary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    ...size.lg,
    color: colors.textInput,
    fontFamily: font.InterBold,
    letterSpacing: 0.4,
  },
  emailText: {
    ...size.lg,
    color: colors.textInput,
    fontFamily: font.InterRegular,
    letterSpacing: 0.4,
  },
});
