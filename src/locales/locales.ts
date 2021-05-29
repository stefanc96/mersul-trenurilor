import LocalizedStrings from 'react-native-localization';
import {LocalesInterface} from './locales.interface';
const en = require('./data/en.json');
const ro = require('./data/ro.json');

export const strings: LocalesInterface = new LocalizedStrings({
  en,
  ro,
});
