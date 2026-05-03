import { getEventsByUserId, getRecentEventsByUserId } from './event.service';

export const calculateUserRisk = (userId: string) => {
    const events = getEventsByUserId(userId);
    const eventsCount = events.length;
    const recentEvents = getRecentEventsByUserId(userId, 1);
    const recentEventsCount = recentEvents.length;
    let riskScore = 0;

    if (eventsCount === 0) {
        riskScore = 0;
    }
    if (eventsCount <= 3 && eventsCount >= 1) {
        riskScore = 20;
    }
    if (eventsCount <= 6 && eventsCount >= 4) {
        riskScore = 50;
    }
    if (eventsCount >= 7) {
        riskScore = 80;
    }
    if (recentEventsCount >= 5) {
        riskScore = Math.max(riskScore, 70);
    }
    return {
        userId,
        eventsCount,
        riskScore,
        recentEventsCount
    };
};
