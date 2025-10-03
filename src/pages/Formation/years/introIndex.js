// ==== Year 1 ====
import IntroFikhY1 from './year1/Introsubjects/Introfiqh/IntroFikhPage';
import IntrosirahY1 from './year1/Introsubjects/Introsirah/IntrosirahPage';
import IntroakhlaqY1 from './year1/Introsubjects/Introakhlaq/IntroakhlaqPage';
import IntroaqidaY1 from './year1/Introsubjects/Introaqida/IntroaqidaPage';
import IntrohadithY1 from './year1/Introsubjects/Introhadith/IntrohadithPage';
import IntronahwY1 from './year1/Introsubjects/Intronahw/IntronahwPage';
import IntrotajwidY1 from './year1/Introsubjects/Introtajwid/IntrotajwidPage';

// ==== Year 2 ====
import IntroFikhY2 from './year2/Introsubjects/Introfiqh/IntroFikhPage';
import IntrosirahY2 from './year2/Introsubjects/Introsirah/IntrosirahPage';
import IntroakhlaqY2 from './year2/Introsubjects/Introakhlaq/IntroakhlaqPage';
import IntroaqidaY2 from './year2/Introsubjects/Introaqida/IntroaqidaPage';
import IntrohadithY2 from './year2/Introsubjects/Introhadith/IntrohadithPage';
import IntronahwY2 from './year2/Introsubjects/Intronahw/IntronahwPage';
import IntrotajwidY2 from './year2/Introsubjects/Introtajwid/IntrotajwidPage';

// ==== Mapping global ====
// clé = slug matière (ex: 'fiqh', 'sirah'...)
// valeur = { "1": ComponentYear1, "2": ComponentYear2 }
const introMapping = {
  fiqh: { 1: IntroFikhY1, 2: IntroFikhY2 },
  sirah: { 1: IntrosirahY1, 2: IntrosirahY2 },
  akhlaq: { 1: IntroakhlaqY1, 2: IntroakhlaqY2 },
  aqida: { 1: IntroaqidaY1, 2: IntroaqidaY2 },
  hadith: { 1: IntrohadithY1, 2: IntrohadithY2 },
  nahw: { 1: IntronahwY1, 2: IntronahwY2 },
  tajwid: { 1: IntrotajwidY1, 2: IntrotajwidY2 },
};

export default introMapping;
