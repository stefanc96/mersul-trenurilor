import {TrainService} from '../types';

export const TRAIN_SERVICES_MAP: {[key: string]: Array<TrainService>} = {
  ['2']: [TrainService.Second],
  ['3']: [TrainService.First, TrainService.Second],
  ['18']: [
    TrainService.Second,
    TrainService.SleepingCabin6,
    TrainService.SleepingCabin2,
    TrainService.SleepingCabin1,
  ],
  ['19']: [TrainService.First, TrainService.Second, TrainService.Bistro],
  ['22']: [
    TrainService.First,
    TrainService.Second,
    TrainService.SleepingCabin6,
    TrainService.SleepingCabin4,
    TrainService.Bistro,
  ],
  ['23']: [
    TrainService.First,
    TrainService.Second,
    TrainService.SleepingCabin6,
    TrainService.SleepingCabin4,
    TrainService.SleepingCabin2,
    TrainService.SleepingCabin1,
    TrainService.Bistro,
  ],
  ['134']: [
    TrainService.First,
    TrainService.Second,
    TrainService.SleepingCabin6,
  ],
  ['150']: [
    TrainService.First,
    TrainService.Second,
    TrainService.SleepingCabin6,
    TrainService.SleepingCabin4,
    TrainService.SleepingCabin2,
    TrainService.SleepingCabin1,
  ],
};
