import database from '../../modules/database';

/**
 * Get data from DB
 * @param list
 * @returns {Promise<void>}
 */
async function getTransactionEquivalent(list = []) {
  const transactions = await database.getTransactionEquivalent(list);
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const transaction of transactions) {
    result[transaction.key] = transaction.type;
  }
  return result;
}

export default {
  async get(req, res) {
    const result = await getTransactionEquivalent();
    res.send(JSON.stringify(result));
  },
  async post(req, res) {
    const { list } = req.body;
    const result = await getTransactionEquivalent(list);
    res.send(JSON.stringify(result));
  },
};
