import { Request, Response } from 'express';
import { calculateUserRisk } from '../services/risk.service';

export const getUserRiskController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    const risk = await calculateUserRisk(userId);

    res.status(200).json({
        status: 'success',
        data: risk
    });
};