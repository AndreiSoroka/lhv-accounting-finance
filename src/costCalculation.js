/* eslint-disable */
const GROCERIES = 'groceries';
const SOPPING = 'shopping';
const OTHER = 'other';
const INVESTMENT = 'investment';
const SPORT = 'sport';
const HEALS = 'heals';
const RESTAURANTS_AND_CAFES = 'restaurants_and_cafes';
const FAST_FOOD = 'fast_food';
const STATE = 'state';
const HOOKAH = 'hookah';
const GASOLENE = 'gasolene';
const EDUCATION = 'education';
const TRANSFERS_TO_ANOTHER_CARD = 'transfers_to_another_card';
const CAR = 'car';
const BUSINESS = 'business';
const HOME = 'home';
const HOBBY = 'hobby';
const TRIP = 'trip';
const TAXI = 'taxi';


const mergeData = {
  // GROCERIES
  'Prisma Sikupilli': GROCERIES,
  'Kreutzwaldi kauplus': GROCERIES,
  'ICA AB/RIMI NAUTICA IS': GROCERIES,
  'ICA AB/POSTIMAJA RIMI': GROCERIES,
  'ICA AB/MELONI RIMI EXP': GROCERIES,
  'ICA AB/PELGULINNA RIMI': GROCERIES,
  'SUURE-JAANI KONSUM': GROCERIES,
  'Solarise toidupood': GROCERIES,
  'IMAVERE POOD': GROCERIES,
  'KAUBAMAJA TALLINN': GROCERIES,
  // SOPPING
  'ECCO KRISTIINE': SOPPING,
  'Instrumentarium Optika': SOPPING,
  'TVOE': SOPPING,
  'Hawaii Express Kristii': SOPPING,
  'Zara /Viru keskus': SOPPING,
  'KRISTIINE PHOTOPOINT': SOPPING,
  'ECCO VIRU': SOPPING,
  'TIGER STORES ESTONIA': SOPPING,
  '"LUSH"': SOPPING,
  // INVESTMENT
  'Andrei Soroka': INVESTMENT,
  // SPORT
  'FIT360 SHOP': SPORT,
  'SPORDIKLUBI REVAL-SPOR': SPORT,
  'Kergejoustikuhall': SPORT,
  'MUSTAMAE ELAMUSSPA': SPORT,
  'Ronimisministeerium': SPORT,
  // HEALS
  'KAUBAMAJA APTEEK': HEALS,
  'BENU apteek Sikupilli': HEALS,
  // RESTAURANTS_AND_CAFES
  'Margot Crepes & Waffle': RESTAURANTS_AND_CAFES,
  'ASIAN FAIR': RESTAURANTS_AND_CAFES,
  'TOA': RESTAURANTS_AND_CAFES,
  'CHI': RESTAURANTS_AND_CAFES,
  'Noya Restoran': RESTAURANTS_AND_CAFES,
  'VEERENNI SOOKLA': RESTAURANTS_AND_CAFES,
  'Tallink Express Hotell': RESTAURANTS_AND_CAFES,
  'Odil Eesti /Solaris': RESTAURANTS_AND_CAFES,
  'Tokumaru Ramen & Sushi': RESTAURANTS_AND_CAFES,
  'SOK/AMARILLO': RESTAURANTS_AND_CAFES,
  'CHOPSTICKS VIRU KESKUS': RESTAURANTS_AND_CAFES,
  'WASHOKU STORY': RESTAURANTS_AND_CAFES,
  'LITTLE INDIA VIRU KESK': RESTAURANTS_AND_CAFES,
  'Sushi Plaza': RESTAURANTS_AND_CAFES,
  'DUBLINERI PUBI': RESTAURANTS_AND_CAFES,
  'CHOPSTICKS': RESTAURANTS_AND_CAFES,
  'LIME BUFFET': RESTAURANTS_AND_CAFES,
  'VAPIANO RESTORAN FOORU': RESTAURANTS_AND_CAFES,
  // FACT_FOOD
  'MCDONALDS 9059239 Must': FAST_FOOD,
  'MCDONALDS 9059221 Viru': FAST_FOOD,
  'MCDONALDS 9059296 Ulem': FAST_FOOD,
  'HESBURGER SYLE': FAST_FOOD,
  'HESBURGER 40501': FAST_FOOD,
  'HOBUJAAMA SUBWAY': FAST_FOOD,
  'S-N RAAGUPESA': FAST_FOOD,
  'Subway voileivapood': FAST_FOOD,
  'Dodo Pizza': FAST_FOOD,
  'Shaurma Kebab': FAST_FOOD,
  // STATE
  'Rahandusministeerium': STATE,
  'TAMMSAARE TEENINDUS': STATE,
  // HOOKAH
  'BOGI HOOKAH PLACE': HOOKAH,
  'Lounge 5': HOOKAH,
  // GASOLENE
  'NESTE S?LE': GASOLENE,
  'Anna Kytus': GASOLENE,
  'CIRCLE K MUSTAMAE': GASOLENE,
  'CIRCLE K LINNAHALL': GASOLENE,
  // EDUCATION
  'PREPLY': EDUCATION,
  // TRANSFERS_TO_ANOTHER_CARD
  'Valeriia Loginova': TRANSFERS_TO_ANOTHER_CARD,
  'TINKOFF QUASICASH': TRANSFERS_TO_ANOTHER_CARD,
  // CAR
  'SOLE JAZZ': CAR,
  'Gegard OY': CAR,
  'If P&C Insurance AS': CAR,
  'TIREMAN OU / TALLINN': CAR,
  // BUSINESS
  'SKR*Contabo': BUSINESS,
  'Eesti Veespordialade Kool': BUSINESS, // ? LERA?
  // HOME
  'Diivanipuhastus OÜ': HOME,
  'KULDVOTMEKE AM': HOME,
  'Mooblimaja': HOME,
  // HOBBY
  'Sihtasutus Eesti Draamateater': HOBBY,
  // TRIP
  'TpiletLuxExpress': TRIP,
  'Lux Express Estonia AS': TRIP,
  'WWW.RZD.RU': TRIP,
  // TAXI
  'YANDEX.TAXI': TAXI,
  'Yandex.Taxi': TAXI,
};

/**
 *
 * @param data
 */
export default function (data) {
  const result = {};
  for (let i = 1; i < data.length; ++i) {
    const [date, who, price] = data[i];
    if (price > 0) {
      continue;
    }
    const key = date.substr(0, 7);
    if (!result[key]) {
      result[key] = {};
    }
    if (mergeData[who]) {
      if (!result[key][mergeData[who]]) {
        result[key][mergeData[who]] = 0;
      }
      result[key][mergeData[who]] += price;
    } else {
      if (!result[key][OTHER]) {
        result[key][OTHER] = 0;
      }
      result[key][OTHER] += price;
      console.warn(`"${who}": not found; price: ${price}`);
    }
  }
  return result;
}
