import React from 'react';
import ContextMenu from 'react-native-context-menu-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconsNames} from '../../config/constants';
import {colors} from '../../config/colors';

export type ContextMenuDataType = {
  title: string;
  func: () => void;
};

export type ContextMenuProps = {
  contextMenuData: ContextMenuDataType[];
};

export const MyContextMenu = ({contextMenuData}: ContextMenuProps) => {
  const actions = contextMenuData.map(it => {
    return {
      title: it.title,
    };
  });
  return (
    <ContextMenu
      actions={actions}
      onPress={e => {
        const index = e.nativeEvent.index;
        console.log('menu', index);
        contextMenuData[index].func();
      }}>
      <Icon name={IconsNames.MORE_VERT} size={18} color={colors.textMain} />
    </ContextMenu>
  );
};
