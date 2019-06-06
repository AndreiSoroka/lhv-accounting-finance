import { UNDEFINED } from '../categories';

/**
 * @param transactions
 * @param categories
 */
export default function (transactions, categories) {
  const costCalculatedData = {};
  const notFoundList = new Set();

  // eslint-disable-next-line no-restricted-syntax
  for (const transaction of transactions) {
    const [date, who, price] = transaction;
    if (price > 0) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const keyOfDate = date.substr(0, 7);
    if (!costCalculatedData[keyOfDate]) {
      costCalculatedData[keyOfDate] = {};
    }

    if (categories[who]) {
      if (!costCalculatedData[keyOfDate][categories[who]]) {
        costCalculatedData[keyOfDate][categories[who]] = 0;
      }
      costCalculatedData[keyOfDate][categories[who]] += price;
    } else {
      notFoundList.add(who);
      if (!costCalculatedData[keyOfDate][UNDEFINED]) {
        costCalculatedData[keyOfDate][UNDEFINED] = 0;
      }
      costCalculatedData[keyOfDate][UNDEFINED] += price;
      console.warn(`"${who}": not found; price: ${price}`);
    }
  }
  return { costCalculatedData, notFoundList };
}
