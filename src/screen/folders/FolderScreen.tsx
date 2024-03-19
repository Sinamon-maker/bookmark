import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from '../../config/colors';
import {ScreenWrapper} from '../../modules/common/ScreenWrapper';
import {SearchInput} from '../../modules/ui/SearchInput';

import {FolderItem} from '../../components/folders/FolderItem';
import {InputAdd} from '../../modules/common/InputAdd';
import {folders} from '../../data/data';
import {EmptyComponent} from '../../modules/common/EmptyComponent';

import {SeparatorFolders} from '../../components/folders/SeparatorFolders';

export const FolderScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.screenWrap}>
        <SearchInput />
        <View style={styles.listWrap}>
          <FlatList
            ListEmptyComponent={<EmptyComponent title="Folders" />}
            style={styles.list}
            data={folders}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View style={styles.listItemWrap}>
                <FolderItem folder={item} index={index} />
              </View>
            )}
            ItemSeparatorComponent={SeparatorFolders}
          />
        </View>
        <InputAdd
          placeholder="Add new folder"
          submit={val => console.log(`submit ${val}`)}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainBack,
    padding: 10,
  },
  listWrap: {
    flex: 1,
  },
  list: {
    borderRadius: 6,
    width: '100%',
    marginVertical: 12,
  },
  listItemWrap: {
    width: '33.3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
