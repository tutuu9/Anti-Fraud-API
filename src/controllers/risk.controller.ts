import { Request, Response, NextFunction } from 'express';
import { calculateUserRisk } from '../services/risk.service';
import { getRiskChecksByUserId } from '../services/riskCheck.service';

export const getUserRiskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;

        const risk = await calculateUserRisk(userId);

        res.status(200).json({
            status: 'success',
            data: risk
        });
    } catch (error) {
        next(error);
    }
};

export const getUserRiskHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;

        const history = await getRiskChecksByUserId(userId);

        res.status(200).json({
            status: 'success',
            results: history.length,
            data: history
        });
    } catch (error) {
        next(error);
    }
};