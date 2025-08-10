import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT configuration
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  expiresIn: '24h' as string,
};

// Password hashing configuration
export const BCRYPT_CONFIG = {
  saltRounds: 12,
};

// JWT utility functions
export const jwtUtils = {
  // Generate JWT token
  generateToken: (payload: { userId: string; email: string }) => {
    return jwt.sign(payload, JWT_CONFIG.secret, {
      expiresIn: '24h',
    });
  },

  // Verify JWT token
  verifyToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_CONFIG.secret) as {
        userId: string;
        email: string;
        iat: number;
        exp: number;
      };
    } catch (error) {
      return null;
    }
  },

  // Extract token from Authorization header
  extractTokenFromHeader: (authHeader: string | undefined): string | null => {
    if (!authHeader) return null;
    
    // Support both "Bearer token" and "token" formats
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    
    return authHeader;
  },
};

// Password utility functions
export const passwordUtils = {
  // Hash password
  hashPassword: async (password: string): Promise<string> => {
    return bcrypt.hash(password, BCRYPT_CONFIG.saltRounds);
  },

  // Compare password with hash
  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },
};

// Auth response types
export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
}
