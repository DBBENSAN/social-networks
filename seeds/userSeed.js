const { User } = require('../models');

const usernames = ['john_doe', 'jane_smith', 'james_bond', 'lisa_frank', 'fox_mulder'];
const userData = [];

for (let i = 0; i < usernames.length; i++) {
  const username = usernames[i];
  const email = `${username}@example.com`;
  userData.push({ username, email });
}

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(userData);
    console.log('Seed data: Users successfully created!', createdUsers);
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedUsers;