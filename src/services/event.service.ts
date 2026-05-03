import { UserEvent } from '../types/event.types';
import { prisma } from '../config/prisma';

type CreateEventData = Omit<UserEvent, 'id' | 'createdAt'>;

//later to change PostreSQL and Prisma
const events: UserEvent[] = [];

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

export const getEventsByUserId = (userId: string): UserEvent[] => {
    return events.filter(event => {
        return event.userId === userId;
    });
};

export const getRecentEventsByUserId = (
    userId: string,
    minutes: number
): UserEvent[] => {
    const now = Date.now();
    const timeWindow = minutes * 60 * 1000;

    return events.filter(event => {
        return (
            event.userId === userId &&
            event.createdAt.getTime() >= now - timeWindow
        );
    });
};
