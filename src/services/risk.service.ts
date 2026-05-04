import { getEventsByUserId, getRecentEventsByUserId, countUniqueUsersByIp } from './event.service';
import { isSuspiciousIp } from './ipRisk.service';
import { RISK_CONFIG } from '../config/risk.config';
import { createRiskCheck } from './riskCheck.service';

export const calculateUserRisk = async (userId: string) => {
    const events = await getEventsByUserId(userId);
    const eventsCount = events.length;
    const recentEvents = await getRecentEventsByUserId(userId, RISK_CONFIG.recentActivityWindowMinutes);
    const recentEventsCount = recentEvents.length;
    let riskScore = 0;
    const reasons: string[] = [];

    if (eventsCount === 0) {
        riskScore = 0;
        reasons.push('Zero activity in short time window');
    }
    if (eventsCount <= 3 && eventsCount >= 1) {
        riskScore = RISK_CONFIG.scores.lowActivity;
        reasons.push('Low total event count');
    }

    if (eventsCount <= 6 && eventsCount >= 4) {
        riskScore = RISK_CONFIG.scores.mediumActivity;
        reasons.push('Medium total event count');
    }

    if (eventsCount >= 7) {
        riskScore = RISK_CONFIG.scores.highActivity;
        reasons.push('High total event count');
    }

    if (recentEventsCount >= RISK_CONFIG.highRecentActivityCount) {
        riskScore = Math.max(riskScore, RISK_CONFIG.scores.highRecentActivity);
        reasons.push('High activity in short time window');
    }
    const hasSuspiciousIp = events.some((event) => {
        return isSuspiciousIp(event.ip);
    });

    if (hasSuspiciousIp) {
        riskScore = Math.max(riskScore, RISK_CONFIG.scores.suspiciousIp);
        reasons.push('Suspicious IP detected');
    }


    const uniqueIps = Array.from(new Set(events.map(event => event.ip)));
    let maxUsersFromSameIp = 0;
    for (const ip of uniqueIps) {
        const usersCount = await countUniqueUsersByIp(ip);
        maxUsersFromSameIp = Math.max(maxUsersFromSameIp, usersCount);
    }
    if (maxUsersFromSameIp >= RISK_CONFIG.highSharedIpUsersCount) {
        riskScore = Math.max(riskScore, RISK_CONFIG.scores.sharedIp);
        reasons.push('Multiple users from same IP');
    }


    const riskResult = {
        userId,
        eventsCount,
        recentEventsCount,
        hasSuspiciousIp,
        maxUsersFromSameIp,
        riskScore,
        reasons
    };

    await createRiskCheck({
        userId: riskResult.userId,
        riskScore: riskResult.riskScore,
        reasons: riskResult.reasons
    });

    return riskResult;
};
