import React from 'react';
import {appStyles} from '../../../theme';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StackActions} from '@react-navigation/native';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const StationInfo = (props: any) => {
  const onPressBack = () => {
    const {navigation} = props;
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onPressBack} />
  );

  return (
    <Layout style={appStyles.container}>
      <TopNavigation alignment="center" accessoryLeft={renderBackAction} />
    </Layout>
  );
};
