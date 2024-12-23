exports = async function () {
  const db = context.services.get('mongodb-atlas').db('peppermint');
  const products = db.collection('products');

  const result = await products.find({}).toArray();

  return result;
};
