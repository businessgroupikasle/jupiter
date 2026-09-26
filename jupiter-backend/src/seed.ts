/**
 * Jupiter Backend — Seed Script (Disabled)
 *
 * Demo/seed data creation logic has been disabled and removed.
 * Database is configured with clean, live data only.
 */

export async function seedDatabase(): Promise<void> {
  console.log('ℹ️ Database seeding is disabled. Live data is preserved.');
}

if (typeof require !== 'undefined' && require.main === module) {
  seedDatabase();
}
