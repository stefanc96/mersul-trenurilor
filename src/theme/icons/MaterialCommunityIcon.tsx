import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconPack, PropsIcon} from './Icon.interface';

export const MaterialCommunityIconsPack = {
  name: IconPack.MaterialCommunity,
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = (name: string | number | symbol) => ({
  toReactElement: (props: any) => MaterialCommunityIcon({name, ...props}),
});

function MaterialCommunityIcon({name, style}: PropsIcon): Element {
  const {height, tintColor, ...iconStyle} = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
