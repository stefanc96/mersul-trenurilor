export interface PropsIcon {
  name: string;
  style: {
    height: number;
    tintColor: string | undefined;
  };
}

export enum IconPack {
  Ion = 'ion',
  Eva = 'eva',
}
