import React from 'react';
import {Divider, Layout, ListItem} from '@ui-kitten/components';
import {PropsTrainDetails} from './TrainDetails.interface';
import {reduce} from 'lodash';
import {getTrainTimeDifference} from '../../../../../utils';
import {strings} from '../../../../../locales';

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
        title={`${strings.name}: ${train.info.categorieTren} ${train.info.numar}`}
      />
      <Divider />
      <ListItem title={`${strings.operator}: SNCFR`} />
      <Divider />
      <ListItem title={`${strings.from}: ${originStation.denStaOrigine}`} />
      <Divider />
      <ListItem
        title={`${strings.to}: ${destinationStation.denStaDestinatie}`}
      />
      <Divider />
      <ListItem
        title={`${strings.totalTime}: ${totalTime.hours}h${totalTime.minutes}m`}
      />
      <Divider />
      <ListItem title={`${strings.totalKm}: ${(totalKm / 1000).toFixed(2)}`} />
      <Divider />
    </Layout>
  );
};
