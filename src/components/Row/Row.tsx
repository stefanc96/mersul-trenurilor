import React from 'react';
import {View, ViewProps} from 'react-native';

export const Row: React.FC<ViewProps> = ({style, children}) => (
  <View style={[style, {flexDirection: 'row'}]}>{children}</View>
);
