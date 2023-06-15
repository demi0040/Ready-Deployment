import { createTables } from './databaseSetup';
import { generateFakeData } from './fakeData';

async function setupDatabase() {
  try {
    await createTables();
    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
}

setupDatabase();