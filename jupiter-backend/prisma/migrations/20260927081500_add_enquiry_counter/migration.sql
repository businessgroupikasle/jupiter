-- CreateTable
CREATE TABLE IF NOT EXISTS "EnquiryCounter" (
    "id" TEXT NOT NULL DEFAULT 'enquiry_counter',
    "lastSeq" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EnquiryCounter_pkey" PRIMARY KEY ("id")
);
