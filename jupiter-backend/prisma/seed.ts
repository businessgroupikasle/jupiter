import { seedDatabase } from '../src/seed';

if (typeof require !== 'undefined' && require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error('❌ Error during database seeding:', e);
      process.exit(1);
    });
}

export { seedDatabase };
