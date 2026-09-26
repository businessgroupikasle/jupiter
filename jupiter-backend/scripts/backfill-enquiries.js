const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function backfill() {
  console.log('--- Starting Enquiry Backfill ---');
  
  // 1. Fetch all enquiries ordered chronologically
  const enquiries = await prisma.enquiry.findMany({
    orderBy: [
      { createdAt: 'asc' },
      { id: 'asc' }
    ]
  });

  console.log(`Found ${enquiries.length} total enquiries.`);

  let maxSeq = 0;

  // First check if any enquiries already have ENQ-xxxx format
  for (const enq of enquiries) {
    if (enq.enquiryId && /^ENQ-\d+$/.test(enq.enquiryId)) {
      const num = parseInt(enq.enquiryId.replace('ENQ-', ''), 10);
      if (num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  // Backfill those missing enquiryId
  for (const enq of enquiries) {
    if (!enq.enquiryId) {
      maxSeq++;
      const generatedId = `ENQ-${String(maxSeq).padStart(4, '0')}`;
      console.log(`Backfilling Enquiry [${enq.id}] -> ${generatedId} (${enq.name})`);
      await prisma.enquiry.update({
        where: { id: enq.id },
        data: { enquiryId: generatedId }
      });
    } else {
      console.log(`Enquiry [${enq.id}] already has ${enq.enquiryId}`);
    }
  }

  // Initialize or update EnquiryCounter to maxSeq
  await prisma.enquiryCounter.upsert({
    where: { id: 'enquiry_counter' },
    update: {
      lastSeq: {
        set: maxSeq
      }
    },
    create: {
      id: 'enquiry_counter',
      lastSeq: maxSeq
    }
  });

  console.log(`EnquiryCounter synchronized with lastSeq = ${maxSeq}`);
  console.log('--- Backfill Complete ---');
}

backfill()
  .catch((err) => {
    console.error('Backfill failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
