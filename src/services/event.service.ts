import { UserEvent } from '../types/event.types';
import { prisma } from '../config/prisma';

type CreateEventData = Omit<UserEvent, 'id' | 'createdAt'>;

export const createEvent = async (data: CreateEventData) => {
  const newEvent = await prisma.event.create({
    data: {
      userId: data.userId,
      type: data.type,
      ip: data.ip,
      email: data.email,
      phone: data.phone
    }
  });

  return newEvent;
};

export const getEvents = async () => {
    return prisma.event.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getEventsByUserId = async (userId: string) => {
    return prisma.event.findMany({
        where: {
            userId
        }
    });
};

export const getRecentEventsByUserId = async (
    userId: string,
    minutes: number
) => {
    const now = new Date();
    const timeWindow = minutes * 60 * 1000;
    const fromDate = new Date(now.getTime() - timeWindow);

    return prisma.event.findMany({
        where: {
            userId,
            createdAt: {
                gte: fromDate
            }
        }
    });
};
