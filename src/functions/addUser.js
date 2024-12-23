exports = async function (payload) {
  const { name, email, status } = payload;

  // Validate required fields
  if (!name || !email || !status) {
    return {
      error: 'Missing required fields: name, email, and status are required.',
    };
  }

  const db = context.services.get('mongodb-atlas').db('peppermint');
  const usersCollection = db.collection('users');

  // Check if the user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return { error: 'User with this email already exists.' };
  }

  // Insert the new user
  const newUser = {
    name,
    email,
    status,
    createdAt: new Date(),
  };

  const result = await usersCollection.insertOne(newUser);

  // Return the result
  return { success: true, userId: result.insertedId };
};
