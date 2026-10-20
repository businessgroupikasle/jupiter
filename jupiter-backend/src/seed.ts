import { ensureDefaultProducts } from './controllers/productController';
import { ensureEnquiryCounterInitialized } from './controllers/enquiryController';
import { ensureDefaultAdminUser } from './controllers/userController';

export async function seedDatabase(): Promise<void> {
  console.log('🌱 Starting database seed with Jupiter official contents...');
  await ensureDefaultAdminUser();
  await ensureDefaultProducts();
  await ensureEnquiryCounterInitialized();
  console.log('✅ Database seeded successfully with official products and enquiries.');
}

if (typeof require !== 'undefined' && require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}
