export enum TrainService {
  First,
  Second,
  Bistro,
  SleepingCabin1,
  SleepingCabin2,
  SleepingCabin4,
  SleepingCabin6,
}

export enum RouteType {
  Implicit = 'Implicita',
}

export enum TrainType {
  Regio = 'R',
  InterRegio = 'IR',
  InterCity = 'IC',
  InterRegioNight = 'IR-N',
  RegioExpress = 'RE',
  EuroNight = 'EN',
  International = 'INT',
}

export interface TrainInfo {
  categorieTren: string;
  kmCum: string;
  lungime: string;
  numar: string;
  operator: string;
  proprietar: string;
  putere: string;
  rang: string;
  servicii: string;
  tonaj: string;
}

export interface RouteInfo {
  codStatieFinala: string;
  codStatieInitiala: string;
  id: string;
  tip: RouteType;
}

export interface Stop {
  ajustari: string;
  codStaDest: string;
  codStaOrigine: string;
  denStaDestinatie: string;
  denStaOrigine: string;
  km: string;
  lungime: string;
  oraP: string;
  oraS: string;
  rci: TrainType;
  rco: TrainType;
  restrictie: string;
  secventa: string;
  stationareSecunde: string;
  tipOprire: string;
  tonaj: string;
  vitezaLivret: string;
}

export interface Station {
  cod: string;
  name: string;
  coordinates: {
    lat: string;
    lon: string;
  };
}

export interface Train {
  info: TrainInfo;
  route: {
    info: RouteInfo;
    stops: Stop[];
  };
}

export interface TrainTime {
  hours: number;
  minutes: number;
}
export type TrainTimetableMetadata = {
  dataExport: string;
  mtValabilDeLa: string;
  mtValabilPinaLa: string;
  versiune: string;
};

export enum ScreenEnum {
  SplashScreen = 'SplashScreen',
  Dashboard = 'Dashboard',
  TrainsTab = 'TrainsTab',
  StationsTab = 'StationsTab',
  ProfileTab = 'ProfileTab',
  TrainInfo = 'TrainInfo',
  StationInfo = 'StationInfo',
}

export type TimetableInfo = {
  metadata?: TrainTimetableMetadata;
  trains: {[key: string]: Train};
  stations: Array<Station>;
  stationWithTrains: {[key: string]: Array<string>};
};

export enum TrainStopStatus {
  InStation = 'InStation',
  HasPassed = 'HasPassed',
  NeedsToArrive = 'NeedsToArrive',
}
