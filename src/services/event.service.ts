import { UserEvent } from '../types/event.types';

type CreateEventData = Omit<UserEvent, 'id' | 'createdAt'>;

//later to change PostreSQL and Prisma
const events: UserEvent[] = [];

export const createEvent = (data: CreateEventData): UserEvent => {
    const newEvent: UserEvent = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date()
    };

    events.push(newEvent);

    return newEvent;
};