import app from '.';
import dotenv from 'dotenv';
import prisma from './services/prisma-client'; 

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
   
    await prisma.$connect();
    console.log('Database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('👋 Database connection closed.');
  process.exit(0);
});