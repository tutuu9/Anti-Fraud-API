import { getEventsByUserId, getRecentEventsByUserId } from './event.service';
import { isSuspiciousIp } from './ipRisk.service';

export const calculateUserRisk = (userId: string) => {
    const events = getEventsByUserId(userId);
    const eventsCount = events.length;
    const recentEvents = getRecentEventsByUserId(userId, 1);
    const recentEventsCount = recentEvents.length;
    let riskScore = 0;
    const reasons: string[] = [];

    if (eventsCount === 0) {
        riskScore = 0;
        reasons.push('Zero activity in short time window');
    }
    if (eventsCount <= 3 && eventsCount >= 1) {
        riskScore = 20;
        reasons.push('Low activity in short time window');
    }
    if (eventsCount <= 6 && eventsCount >= 4) {
        riskScore = 50;
        reasons.push('Medium activity in short time window');
    }
    if (eventsCount >= 7) {
        riskScore = 80;
        reasons.push('High total event count');
    }
    if (recentEventsCount >= 5) {
        riskScore = Math.max(riskScore, 70);
        reasons.push('High activity in short time window');
    }
    const hasSuspiciousIp = events.some((event) => {
        return isSuspiciousIp(event.ip);
    });

    if (hasSuspiciousIp) {
        riskScore = Math.max(riskScore, 60);
        reasons.push('Suspicious IP detected');
    }
    
    return {
        userId,
        eventsCount,
        recentEventsCount,
        hasSuspiciousIp,
        riskScore,
        reasons
    };
};
