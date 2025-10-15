import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();
const subjects = [
  { code: 'toan', name: 'Math' },
  { code: 'ngu_van', name: 'Literature' },
  { code: 'ngoai_ngu', name: 'Foreign Language' },
  { code: 'vat_li', name: 'Physics' },
  { code: 'hoa_hoc', name: 'Chemistry' },
  { code: 'sinh_hoc', name: 'Biology' },
  { code: 'lich_su', name: 'History' },
  { code: 'dia_li', name: 'Geology' },
  { code: 'gdcd', name: 'Civics' },
];

async function main() {
  console.log('Seeding process started...');

  await prisma.score.deleteMany({});
  await prisma.candidate.deleteMany({});
  await prisma.subject.deleteMany({});
  console.log('Old data cleared.');

  await prisma.subject.createMany({
    data: subjects,
    skipDuplicates: true, 
  });
  console.log('Subjects seeded.');

  const filePath = path.join(__dirname, 'data', 'scores.csv');
//   console.log(__dirname)
  const records: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => records.push(data))
    .on('end', async () => {
      console.log(`Read ${records.length} records from CSV file.`);

      for (const record of records) {
        
        const registrationNumber = record.sbd;
        if (!registrationNumber) continue; 

       
        await prisma.candidate.create({
          data: {
            registrationNumber: registrationNumber,
          },
        });

      
        for (const subject of subjects) {
          const subjectCodeInCSV = subject.code.toLowerCase(); 
          const scoreValue = record[subjectCodeInCSV];

    
          if (scoreValue !== null && scoreValue !== undefined && scoreValue !== '') {
            await prisma.score.create({
              data: {
                value: parseFloat(scoreValue),
                languageCode: subject.code === 'ngoai_ngu' ? record.ma_ngoai_ngu : null,
            
                candidateRegistrationNumber: registrationNumber,
                subjectCode: subject.code,
              },
            });
          }
        }
      }

      console.log('Candidates and scores have been successfully seeded.');
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });