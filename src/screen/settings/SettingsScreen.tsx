import React from 'react';
import {IconsNames} from '../../config/constants';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {ButtonLink} from '../../modules/ui/ButtonLink';
import {IconComponent} from '../../modules/ui/IconComponent';
import {Text, View} from 'react-native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {StyleSheet} from 'react-native';

export const SettingsScreen = () => {
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
          <Text style={styles.avatarText}>jgjkkk</Text>
        </View>
        <ButtonLink
          text="logout"
          onPress={() => console.log('logout')}
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
});
