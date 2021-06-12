import React from 'react';
import {Layout, ListItem} from '@ui-kitten/components';
import {PropsTrainDetails} from './TrainDetails.interface';
import {reduce} from 'lodash';

export const TrainDetails: React.FC<PropsTrainDetails> = ({stops}) => {
  const totalKm = reduce(
    stops,
    (sum, stop) => {
      return sum + Number(stop.km);
    },
    0,
  );

  return (
    <Layout>
      <ListItem title={`Total km: ${(totalKm / 1000).toFixed(2)}`} />
    </Layout>
  );
};
