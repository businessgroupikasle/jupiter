-- Step 1: Ensure enquiryId column exists (nullable initially so existing rows are preserved)
ALTER TABLE "Enquiry" ADD COLUMN IF NOT EXISTS "enquiryId" TEXT;

-- Step 2: Ensure sequence exists for automatic unique enquiryId generation
CREATE SEQUENCE IF NOT EXISTS "enquiry_id_seq";

-- Step 3: Ensure EnquiryCounter table exists for sequential tracking
CREATE TABLE IF NOT EXISTS "EnquiryCounter" (
    "id" TEXT NOT NULL DEFAULT 'enquiry_counter',
    "lastSeq" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "EnquiryCounter_pkey" PRIMARY KEY ("id")
);

-- Step 4: Backfill existing rows with unique valid sequential values
DO $$
DECLARE
    current_max INTEGER := 0;
    r RECORD;
BEGIN
    -- Calculate highest existing number from valid 'ENQ-XXXX' values
    SELECT COALESCE(MAX(
        CASE 
            WHEN "enquiryId" ~ '^ENQ-[0-9]+$' THEN CAST(SUBSTRING("enquiryId" FROM 5) AS INTEGER)
            ELSE 0 
        END
    ), 0) INTO current_max FROM "Enquiry";

    -- Check if EnquiryCounter has higher lastSeq
    SELECT COALESCE(MAX("lastSeq"), current_max) INTO current_max 
    FROM "EnquiryCounter" 
    WHERE "id" = 'enquiry_counter';

    IF current_max IS NULL THEN
        current_max := 0;
    END IF;

    -- Sequentially backfill all rows missing enquiryId in chronological order
    FOR r IN 
        SELECT "id" 
        FROM "Enquiry" 
        WHERE "enquiryId" IS NULL OR TRIM("enquiryId") = ''
        ORDER BY "createdAt" ASC, "id" ASC
    LOOP
        current_max := current_max + 1;
        UPDATE "Enquiry"
        SET "enquiryId" = 'ENQ-' || LPAD(current_max::TEXT, 4, '0')
        WHERE "id" = r."id";
    END LOOP;

    -- Synchronize sequence with current_max
    PERFORM setval('enquiry_id_seq', GREATEST(current_max, 1), true);

    -- Synchronize EnquiryCounter table with current_max
    INSERT INTO "EnquiryCounter" ("id", "lastSeq")
    VALUES ('enquiry_counter', current_max)
    ON CONFLICT ("id") DO UPDATE
    SET "lastSeq" = GREATEST("EnquiryCounter"."lastSeq", current_max);
END $$;

-- Step 5: Make enquiryId required (NOT NULL) now that all existing rows are backfilled
ALTER TABLE "Enquiry" ALTER COLUMN "enquiryId" SET NOT NULL;

-- Step 6: Ensure unique constraint and index on enquiryId
CREATE UNIQUE INDEX IF NOT EXISTS "Enquiry_enquiryId_key" ON "Enquiry"("enquiryId");
CREATE INDEX IF NOT EXISTS "Enquiry_enquiryId_idx" ON "Enquiry"("enquiryId");

-- Step 7: Create database-level trigger so every new enquiry automatically receives a unique enquiryId if omitted
CREATE OR REPLACE FUNCTION set_enquiry_id_if_missing()
RETURNS TRIGGER AS $$
DECLARE
    seq_val BIGINT;
    extracted_num BIGINT;
BEGIN
    IF NEW."enquiryId" IS NULL OR TRIM(NEW."enquiryId") = '' THEN
        seq_val := nextval('enquiry_id_seq');
        NEW."enquiryId" := 'ENQ-' || LPAD(seq_val::TEXT, 4, '0');
    ELSE
        IF NEW."enquiryId" ~ '^ENQ-[0-9]+$' THEN
            extracted_num := CAST(SUBSTRING(NEW."enquiryId" FROM 5) AS BIGINT);
            PERFORM setval('enquiry_id_seq', GREATEST(extracted_num, nextval('enquiry_id_seq')), true);
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_enquiry_id ON "Enquiry";
CREATE TRIGGER trigger_set_enquiry_id
BEFORE INSERT ON "Enquiry"
FOR EACH ROW
EXECUTE FUNCTION set_enquiry_id_if_missing();
