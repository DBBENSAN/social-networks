const seedUsers = require('./userSeed')
const seedThoughts = require('./thoughtSeed')
const db = require('../config/connection')


const seedDatabase = async () => {
   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
   db.once('open', async () => {
      await seedUsers();
      await seedThoughts()
      console.log('ok')
      process.exit(0)
   })
}

seedDatabase()