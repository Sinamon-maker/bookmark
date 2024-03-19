import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {colors} from '../../config/colors';
import {IconsNames} from '../../config/constants';
import {font, size} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';
import {IconComponent} from '../../modules/ui/IconComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Data} from '../../config/types';
import {ModalEdit} from '../../modules/common/ModalEdit';
import {MyContextMenu} from '../../modules/common/ContextMenu';

export type CatalogueItemProps = {
  data: Data;
};

export const CatalogueItem = ({data}: CatalogueItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const submit = (val: string) => {
    console.log('new catalogue', val);
  };

  const onEdit = () => {
    Alert.alert(
      'Deliting',
      'Are you shure yuo are going to delete Catalogue? All tasks will be deleted too.',
      [{text: 'No'}, {text: 'Yes', onPress: () => console.log('delete')}],
    );
  };
  return (
    <>
      <View style={styles.itemWrap}>
        <Text style={styles.number}>2.</Text>
        <View style={{flex: 1}}>
          <View style={styles.itemContent}>
            <Text style={styles.title}>
              Name of Catalogue and very long name super long
            </Text>
            <View style={styles.menuBtn}>
              <MyContextMenu
                contextMenuData={[
                  {title: 'edit', func: () => setModalOpen(true)},
                  {title: 'delete', func: () => onEdit()},
                ]}
              />
            </View>
          </View>
          <Text style={{...size.sm, color: colors.additional}}>
            ong name super long
          </Text>
        </View>
      </View>
      <ModalEdit
        modalFolderOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        placeholder="Enter new name"
        previousValue={data.title}
        submit={submit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    padding: 16,
    backgroundColor: colors.mainBack,
    height: '100%',
  },
  itemWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 6,
    gap: 8,
    borderRadius: 12,
    marginVertical: 4,
  },
  number: {
    fontFamily: font.InterBold,
    ...size.base,
    color: colors.textMain,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontFamily: font.InterSemiBold,
    ...size.base,
    color: colors.secondary,
  },
  menuBtn: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
