import { getEventsByUserId, getRecentEventsByUserId } from './event.service';
import { isSuspiciousIp } from './ipRisk.service';

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
    const hasSuspiciousIp = events.some((event) => {
        return isSuspiciousIp(event.ip);
    });
    if (hasSuspiciousIp) {
        riskScore = Math.max(riskScore, 60);
    }
    return {
        userId,
        eventsCount,
        recentEventsCount,
        hasSuspiciousIp,
        riskScore
    };
};
