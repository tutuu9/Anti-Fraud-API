import { prisma } from '../config/prisma';

type CreateRiskCheckData = {
    userId: string;
    riskScore: number;
    reasons: string[];
};

export const createRiskCheck = async (data: CreateRiskCheckData) => {
    const riskCheck = await prisma.riskCheck.create({
        data: {
            userId: data.userId,
            riskScore: data.riskScore,
            reasons: data.reasons
        }
    });

    return riskCheck;
};