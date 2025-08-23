import { Request, Response, NextFunction } from 'express';
import { jwtUtils, AuthUser } from '../config/auth';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// Authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = jwtUtils.extractTokenFromHeader(authHeader);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acesso requerido. Faça login para continuar.',
    });
  }

  const decoded = jwtUtils.verifyToken(token);
  
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido ou expirado. Faça login novamente.',
    });
  }

  // Add user info to request object
  req.user = {
    id: decoded.userId,
    email: decoded.email,
  };

  next();
};

// Optional authentication middleware (for routes that can work with or without auth)
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = jwtUtils.extractTokenFromHeader(authHeader);

  if (token) {
    const decoded = jwtUtils.verifyToken(token);
    if (decoded) {
      req.user = {
        id: decoded.userId,
        email: decoded.email,
      };
    }
  }

  next();
};



