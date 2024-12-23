exports = async function FetchUsersByStatus(status) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('peppermint')
    .collection('users');

  // Log a message to confirm function execution
  console.log('Fetching users with status:', status);

  // Query the database for users based on the "status" field

  const users = await collection.find({ status }).toArray();
  // Log the result of the query for debugging
  console.log('Fetched users:', users);

  // Return the result
  return users;
};
