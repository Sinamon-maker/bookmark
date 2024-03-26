import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {SortCataloguesParam} from '../../config/constants';
import {size} from '../../config/fonts';
import {AppButton} from '../../modules/ui/AppButton';

export type CatalogueFiltersProps = {
  onPressSort: (val: SortCataloguesParam) => void;
  disableSort?: boolean;
  query: SortCataloguesParam;
};

export const CatalogueFilters = ({
  onPressSort,
  query,
  disableSort = false,
}: CatalogueFiltersProps) => {
  return (
    <View style={styles.actionTaskWrap}>
      <View style={styles.sortingWrap}>
        <AppButton
          background={
            query === SortCataloguesParam.ALL
              ? colors.primary
              : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text={SortCataloguesParam.ALL}
          onPress={() => onPressSort(SortCataloguesParam.ALL)}
          disabled={disableSort}
        />
        <AppButton
          background={
            query === SortCataloguesParam.CURRENT
              ? colors.primary
              : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text={SortCataloguesParam.CURRENT}
          onPress={() => onPressSort(SortCataloguesParam.CURRENT)}
          disabled={disableSort}
        />
        <AppButton
          background={
            query === SortCataloguesParam.ARCHIVED
              ? colors.primary
              : colors.secondary
          }
          btnStyles={styles.sortBtn}
          textStyles={styles.textSortBtn}
          text={SortCataloguesParam.ARCHIVED}
          onPress={() => onPressSort(SortCataloguesParam.ARCHIVED)}
          disabled={disableSort}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionTaskWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 4,
    paddingRight: 4,

    borderColor: colors.additional,
  },

  sortingWrap: {
    flexDirection: 'row',
    gap: 6,
  },
  sortBtn: {
    // backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textSortBtn: {
    ...size.sm,
  },
});
