import LocalizedStrings, {
  LocalizedStrings as LocaleType,
} from 'react-native-localization';
import {LocalesInterface} from './locales.interface';

const en = require('./data/en.json');
const ro = require('./data/ro.json');

export const strings: LocaleType<LocalesInterface> = new LocalizedStrings({
  ro,
  en,
});
