import React from 'react';
import {Layout, ListItem} from '@ui-kitten/components';
import {PropsTrainDetails} from './TrainDetails.interface';

export const TrainDetails: React.FC<PropsTrainDetails> = ({totalKm}) => {
  return (
    <Layout>
      <ListItem title={`Total km: ${(totalKm / 1000).toFixed(2)}`} />
    </Layout>
  );
};
