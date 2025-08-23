import { Request, Response } from 'express';
import { prisma } from '../../index';
import { jwtUtils, passwordUtils, AuthResponse } from '../../config/auth';
import { z } from 'zod';
import { loginSchema } from '../../schemas/auth/loginSchema';
import { registerSchema } from '../../schemas/auth/registerSchema';



// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user in database
    const user = await prisma.userAuth.findUnique({
      where: { 
        email: email,
      }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      } as AuthResponse);
      return;
    }

    const isPasswordValid = await passwordUtils.comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      } as AuthResponse);
      return;
    }

    // Generate JWT token
    const token = jwtUtils.generateToken({
      userId: user.id.toString(),
      email: user.email,
    });

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        id: user.id.toString(),
        email: user.email,
      },
      token,
    } as AuthResponse);

  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.issues,
      });
      return;
    }

    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    } as AuthResponse);
  }
};

// Verify token controller
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // If we reach here, the token is valid (middleware already verified it)
    res.json({
      success: true,
      message: 'Token válido',
      user: req.user,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso',
  });
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};