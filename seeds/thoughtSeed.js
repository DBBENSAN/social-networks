const { Thought } = require('../models');

const thoughtData = [
  {
    thoughtText: "I'm excited to learn more about coding!",
    username: '63ffe3aff650b5f1e129b84c'
  },
  {
    thoughtText: 'I love hiking in the mountains.',
    username: '63ffe3aff650b5f1e129b84d'
  },
  {
    thoughtText: 'The beach is my happy place.',
    username: '63ffe3aff650b5f1e129b84e'
  },
  {
    thoughtText: 'I want to travel the world someday.',
    username: '63ffe3aff650b5f1e129b84f'
  },
  {
    thoughtText: 'I believe in aliens.',
    username: '63ffe3aff650b5f1e129b850'
  }
];

const seedThoughts = async () => {
  try {
    await Thought.deleteMany({});
    const createdThoughts = await Thought.insertMany(thoughtData);
    console.log(`Seed data: Thoughts successfully created! (${createdThoughts.length} items)`);
  } catch (err) {
    console.error(`Seed data: Failed to seed Thoughts collection: ${err}`);
  }
};

module.exports = seedThoughts;