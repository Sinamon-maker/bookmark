import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {font, size} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';

export type FolderChooseButtonProps = {
  onPress: () => void;
};

export const FolderChooseButton = ({onPress}: FolderChooseButtonProps) => {
  return (
    <View style={styles.contentWrap}>
      <IconComponent
        iconName={IconsNames.OPENFOLDER}
        color={colors.secondary}
      />
      <Text style={styles.text}>jhfjffkf</Text>
      <AppButton btnStyles={styles.btnOpenStyles} onPress={onPress}>
        <IconComponent iconName={IconsNames.CHEVRON_DOWM} />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrap: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontFamily: font.InterSemiBold,
    ...size.base,
    color: colors.textMain,
  },
  btnOpenStyles: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
});
