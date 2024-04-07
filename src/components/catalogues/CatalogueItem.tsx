import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import {colors} from '../../config/colors';
import {font, size} from '../../config/fonts';
import {Data} from '../../config/types';
import {ModalEdit} from '../../modules/common/ModalEdit';
import {MyContextMenu} from '../../modules/common/ContextMenu';
import {alertText, convertTime} from '../../utils';

export type CatalogueItemProps = {
  data: Data;
  index: number;
  activeCatalogue?: string;
  onPressCatalogue?: (val: string) => void;
  onDeleteCatalogue: (val: string) => void;
  onEditCatalogue: (val: string, id: string) => void;
  onArchiveCatalogue: (id: string) => void;
};

export const CatalogueItem = ({
  data,
  index,
  activeCatalogue,
  onPressCatalogue,
  onDeleteCatalogue,
  onEditCatalogue,
  onArchiveCatalogue,
}: CatalogueItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const submit = (val: string) => {
    onEditCatalogue(val, data.id);
    setModalOpen(false);
  };

  const onItemPress = () => {
    onPressCatalogue && onPressCatalogue(data.id);
  };
  const onPressDelete = () => {
    Alert.alert(alertText.deleteTitle, alertText.deleteCatalogue, [
      {text: 'No'},
      {text: 'Yes', onPress: () => onDeleteCatalogue(data.id)},
    ]);
  };

  const toArchive = () => {
    if (data.tasks.length === 0) {
      Alert.alert(alertText.archivation, alertText.archiveWithNoTasks, [
        {text: 'Ok'},
      ]);
    } else {
      Alert.alert(alertText.archivation, alertText.archiveWithTasks, [
        {text: 'Ok', onPress: () => onArchiveCatalogue(data.id)},
        {text: 'Cancel'},
      ]);
    }
  };
  const contextMenuData = (archived: boolean) => {
    if (!archived) {
      return [
        {title: 'edit', func: () => setModalOpen(true)},
        {title: 'delete', func: () => onPressDelete()},
        {title: 'toArchive', func: () => toArchive()},
      ];
    } else {
      return [{title: 'delete', func: () => onPressDelete()}];
    }
  };

  return (
    <>
      <View
        style={[
          styles.itemWrap,
          {
            borderColor:
              data.id === activeCatalogue ? colors.additional : colors.primary,
          },
        ]}>
        <Text style={styles.number}>{index + 1}.</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.itemContent}>
            <Pressable onPress={onItemPress} style={{flex: 1}}>
              <Text style={styles.title}>{data.title}</Text>

              <Text style={{...size.xs, color: colors.additional}}>
                {convertTime(data.createdAt)}
              </Text>
            </Pressable>
          </View>
          <View style={styles.menuBtn}>
            <MyContextMenu contextMenuData={contextMenuData(data.archived)} />
          </View>
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
    justifyContent: 'space-between',
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
    borderRadius: 8,
    padding: 2,
  },
});
