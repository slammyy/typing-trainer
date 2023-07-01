import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// insert WPM into database
export const insertWpm = async (wpm) => {
    prisma.records.create(wpm);
}

// get max WPM from database
export const getMaxWpm = async () => {
    const maxWpm = await prisma.records.aggregate({
        _max: {
            wpm
        }
    });
    return maxWpm;
}

