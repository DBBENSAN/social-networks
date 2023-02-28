const { Thought } = require('../models');

const thoughtData = [
  {
    thoughtText: "I'm excited to learn more about coding!",
    username: 'john_doe'
  },
  {
    thoughtText: 'I love hiking in the mountains.',
    username: 'jane_smith'
  },
  {
    thoughtText: 'The beach is my happy place.',
    username: 'james_bond'
  },
  {
    thoughtText: 'I want to travel the world someday.',
    username: 'lisa_frank'
  },
  {
    thoughtText: 'I believe in aliens.',
    username: 'fox_mulder'
  }
];

const seedThoughts = async () => {
  try {
    await Thought.deleteMany({});
    const createdThoughts = await Thought.insertMany(thoughtData);
    console.log('Seed data: Thoughts successfully created!', createdThoughts);
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedThoughts;