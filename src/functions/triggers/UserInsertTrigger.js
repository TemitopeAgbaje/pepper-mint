exports = async function (changeEvent) {
  const { fullDocument } = changeEvent;

  // Log the event
  console.log('New document inserted:', JSON.stringify(fullDocument));

  const db = context.services.get('Cluster0').db('peppermint');
  const collection = db.collection('users');

  // update a field in the inserted document
  await collection.updateOne(
    { _id: fullDocument._id },
    { $set: { lastModified: new Date() } },
  );

  return 'Trigger executed successfully';
};
