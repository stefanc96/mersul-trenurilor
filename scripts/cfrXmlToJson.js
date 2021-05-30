const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');

const convert = require('xml-js');

function toCamel(o) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

const xml = fs.readFileSync(path.resolve('./date.xml'), 'utf8');
const cfrMersulTrenurilorString = convert.xml2json(xml, {
  compact: true,
  spaces: 4,
});

const stationWithTrains = {};
const cfrMersulTrenurilorObject = JSON.parse(cfrMersulTrenurilorString);
const metadata = cfrMersulTrenurilorObject.XmlIf.XmlMts.Mt;

const trains = {};
cfrMersulTrenurilorObject.XmlIf.XmlMts.Mt.Trenuri.Tren.forEach(train => {
  const trainRouteMetadata = train.Trase.Trasa;
  const route = {
    info: trainRouteMetadata._attributes,
    stops: trainRouteMetadata.ElementTrasa.map(({_attributes: stop}) => {
      if (stationWithTrains[stop.DenStaOrigine]) {
        stationWithTrains[stop.DenStaOrigine].push(train._attributes.Numar);
      } else {
        stationWithTrains[stop.DenStaOrigine] = [train._attributes.Numar];
      }
      return {
        ...stop,
      };
    }),
  };
  trains[train._attributes.Numar] = {
    info: train._attributes,
    route,
  };
});

let stations = [];
lineReader.eachLine(
  './stations.txt',
  null,
  function (line) {
    const [cod, name, lat, lon] = line.split(',');

    stations.push({
      name,
      cod,
      coordinates: {
        lat,
        lon,
      },
    });
  },
  () => {
    const mappedData = toCamel({
      cfr: {
        metadata: {
          ...metadata._attributes,
        },
        trains,
        stations,
      },
    });

    fs.writeFileSync(
      'mersul-trenurilor.json',
      JSON.stringify({
        cfr: {
          ...mappedData.cfr,
          stationWithTrains,
        },
      }),
    );
  },
);
