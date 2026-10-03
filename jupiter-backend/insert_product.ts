import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productData = {
    name: 'Jupiter V 10 B Model – High Speed Fly Ash Brick Making Machine',
    slug: 'jupiter-v-10-b-model-high-speed-fly-ash-brick-making-machine',
    category: 'Fly Ash Brick Machine',
    capacity: '2,300–2,400 Bricks per Hour',
    power: '12.5 HP',
    brickSize: '230 × 105 × 75 mm',
    image: '',
    description: `The Jupiter V 10 B is a high-speed fly ash brick making machine for commercial production.
It features a 100 ton pressing load for dependable brick manufacturing.
The machine is suitable for fly ash, iron oxide, lime sludge and quarry waste materials.
A 10 HP motor powers the machine operation.
The brick outlet conveyor supports smooth handling of finished bricks.
It manufactures standard 230 × 105 × 75 mm fly ash bricks.`,
    specifications: {
      brandTag: 'JUPITER INDUSTRIES',
      featureBadges: [
        '100 Ton Pressing Load',
        'High Speed Machine',
        'Brick Outlet Conveyor',
        'Multi-Material Compatible'
      ],
      highlights: [
        { title: '100 Ton Pressing Load', description: 'Heavy-duty 100 ton pressing load supports high-speed fly ash brick production.' },
        { title: 'High-Speed Production', description: 'Produces approximately 2,300 to 2,400 bricks per hour for commercial requirements.' },
        { title: 'Multi-Material Support', description: 'Suitable for fly ash, iron oxide, lime sludge and quarry waste raw materials.' },
        { title: 'Brick Outlet Conveyor', description: 'A 2 HP brick outlet conveyor helps move finished bricks efficiently.' }
      ],
      specTableColumns: ['Parameter', 'Details', 'Specification'],
      specTableRows: [
        { 'Parameter': 'Machine Model', 'Details': 'Jupiter V 10 B', 'Specification': 'High Speed Fly Ash Brick Machine' },
        { 'Parameter': 'Production Capacity', 'Details': '2,300–2,400', 'Specification': 'Bricks per Hour' },
        { 'Parameter': 'Pressing Load', 'Details': '100 Ton', 'Specification': 'High Speed Machine' },
        { 'Parameter': 'Main Motor Capacity', 'Details': '10 HP', 'Specification': '—' },
        { 'Parameter': 'Cooling System Motor', 'Details': '0.5 HP', 'Specification': '—' },
        { 'Parameter': 'Brick Outlet Conveyor Motor', 'Details': '2 HP', 'Specification': '—' },
        { 'Parameter': 'Raw Materials', 'Details': 'Fly Ash, Iron Oxide', 'Specification': 'Lime Sludge, Quarry Waste' },
        { 'Parameter': 'Brick Size', 'Details': '230 × 105 × 75 mm', 'Specification': '—' },
        { 'Parameter': 'Motor Brands', 'Details': 'Siemens, Crompton, Havells', 'Specification': '—' }
      ],
      keyFeatures: [
        '100 ton pressing load for high-speed fly ash brick production.',
        '10 HP main motor with a 0.5 HP cooling system motor.',
        '2 HP brick outlet conveyor for efficient brick handling.',
        'Compatible with fly ash, iron oxide, lime sludge and quarry waste.'
      ],
      advantages: [
        { title: 'Heavy-Duty Pressing', description: '100 ton pressing capacity supports reliable brick compaction during production.' },
        { title: 'Flexible Raw Material Use', description: 'Supports multiple raw materials used in fly ash brick manufacturing.' },
        { title: 'Smooth Brick Handling', description: 'Brick outlet conveyor helps move finished bricks efficiently after production.' },
        { title: 'Reliable Components', description: 'Uses Siemens, Crompton and Havells motors for dependable industrial operation.' }
      ]
    },
    isActive: true,
    order: 0
  };

  const existing = await prisma.product.findUnique({
    where: { slug: productData.slug }
  });

  if (existing) {
    await prisma.product.update({
      where: { id: existing.id },
      data: productData
    });
    console.log('Product updated successfully!');
  } else {
    await prisma.product.create({
      data: productData
    });
    console.log('Product created successfully!');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
