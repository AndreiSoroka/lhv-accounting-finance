import database from '../../modules/database';

export default {
  async get(req, res) {
    const transactions = await database.getTransactionEquivalent();
    const result = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const transaction of transactions) {
      result[transaction.key] = transaction.type;
    }
    res.send(JSON.stringify(result));
  },
};
