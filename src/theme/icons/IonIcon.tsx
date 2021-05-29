import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconPack, PropsIcon} from './Icon.interface';

export const IonIconsPack = {
  name: IconPack.Ion,
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
  toReactElement: (props: any) => IonIcon({name, ...props}),
});

function IonIcon({name, style}: PropsIcon): Element {
  const {height, tintColor, ...iconStyle} = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
