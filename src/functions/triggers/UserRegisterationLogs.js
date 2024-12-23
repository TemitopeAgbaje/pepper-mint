exports = async function (changeEvent) {
  const { fullDocument } = changeEvent;
  const log = context.services
    .get('Cluster0')
    .db('peppermint')
    .collection('logs');

  const logEntry = {
    action: 'User Registered',
    userId: fullDocument._id,
    email: fullDocument.email,
    timestamp: new Date(),
  };

  await log.insertOne(logEntry);
};
