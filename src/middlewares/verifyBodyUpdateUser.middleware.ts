import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const verifyBodyUpdateMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const keys = Object.keys(req.body);

	if (
		keys.includes("isAdmin") ||
		keys.includes("isActive") ||
		keys.includes("id")
	) {
		throw new AppError(
			"it is not allowed to edit the fields: isActive, IsAdm and id",
			401
		);
	}

	return next();
};

export default verifyBodyUpdateMiddleware;
