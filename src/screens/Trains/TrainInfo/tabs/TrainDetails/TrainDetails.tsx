import React from 'react';
import {Divider, Layout, ListItem} from '@ui-kitten/components';
import {PropsTrainDetails} from './TrainDetails.interface';
import {reduce} from 'lodash';
import {getTrainTimeDifference} from '../../../../../utils';

export const TrainDetails: React.FC<PropsTrainDetails> = ({
  train,
  originStation,
  destinationStation,
}) => {
  const {stops} = train.route;
  const totalTime = getTrainTimeDifference(
    originStation.oraS,
    destinationStation.oraS,
  );
  const totalKm = reduce(
    stops,
    (sum, stop) => {
      return sum + Number(stop.km);
    },
    0,
  );
  return (
    <Layout>
      <ListItem
        title={`Nume: ${train.info.categorieTren} ${train.info.numar}`}
      />
      <Divider />
      <ListItem title={'Operator: SNCFR'} />
      <Divider />
      <ListItem title={`De la: ${originStation.denStaOrigine}`} />
      <Divider />
      <ListItem title={`Pana la: ${destinationStation.denStaDestinatie}`} />
      <Divider />
      <ListItem
        title={`Timp total: ${totalTime.hours}h${totalTime.minutes}m`}
      />
      <Divider />
      <ListItem title={`Total km: ${(totalKm / 1000).toFixed(2)}`} />
      <Divider />
    </Layout>
  );
};
