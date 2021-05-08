export enum TrainClass {
    Second = '2'
}

export enum RouteType {
    Implicit = 'Implicita'
}

export enum TrainType {
    Regio = 'R'
}

export interface TrainInfo {
    categorieTren: string,
    kmCum: string,
    lungime: string,
    numar: string,
    operator: string,
    proprietar: string,
    putere: string,
    rang: string,
    servicii: TrainClass,
    tonaj: string
}

export interface RouteInfo {
    codStatieFinala: string,
    codStatieInitiala: string,
    id: string,
    tip: RouteType
}

export interface Stop {
    ajustari: string,
    codStaDest: string,
    codStaOrigine: string,
    denStaDestinatie: string,
    denStaOrigine: string,
    km: string,
    lungime: string,
    oraP: string,
    oraS: string,
    rci: TrainType,
    rco: TrainType,
    restrictie: string,
    secventa: string,
    stationareSecunde: string,
    tipOprire: string,
    tonaj: string,
    vitezaLivret: string
}

export interface Station {
    cod: string,
    denumire: string
}

export interface Train {
    info: TrainInfo,
    route: {
        info: RouteInfo,
        stops: Stop[]
    },
    stations: Station[]
}


export interface TrainTime {
    hours: number,
    minutes: number
}
