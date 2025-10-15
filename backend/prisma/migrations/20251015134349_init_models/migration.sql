-- CreateTable
CREATE TABLE "Candidate" (
    "registrationNumber" TEXT NOT NULL,
    "fullName" TEXT,
    "dateOfBirth" TIMESTAMP(3),

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("registrationNumber")
);

-- CreateTable
CREATE TABLE "Subject" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Score" (
    "value" DOUBLE PRECISION NOT NULL,
    "languageCode" TEXT,
    "candidateRegistrationNumber" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("candidateRegistrationNumber","subjectCode")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_candidateRegistrationNumber_fkey" FOREIGN KEY ("candidateRegistrationNumber") REFERENCES "Candidate"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_subjectCode_fkey" FOREIGN KEY ("subjectCode") REFERENCES "Subject"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
