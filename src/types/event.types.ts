export type EventType = 'login' | 'order' | 'request';
export type UserEvent = {
  id: string;
  userId: string;
  type: EventType;
  ip: string;
  email?: string;
  phone?: string;
  createdAt: Date;
};