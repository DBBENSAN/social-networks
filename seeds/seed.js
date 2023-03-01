const seedUsers = require('./userSeed')
const seedThoughts = require('./thoughtSeed')
const db = require('../config/connection')


const seedDatabase = async () => {
   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
   db.once('open', async () => {
      console.log(`
      .............................
      ........Database seeding.....
      .............................
      
      `)
      await seedUsers();
      await seedThoughts()
      console.log('DB SEEDED DB SEEDED DB SEEDED DB SEEDED DB SEEDED')
      process.exit(0)
   })
}

seedDatabase()