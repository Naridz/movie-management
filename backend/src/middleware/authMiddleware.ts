import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number
    role: string
  }
}

export const authenticateToken = ( req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string }
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    }
    next()
  } catch (error) {
    return res.json({ status:'error' , message: 'Invalid' })
  }
}

export const onlyManager = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'MANAGER') {
    return res.status(403).json({ message: 'Only MANAGER can delete' })
  }
  next()
}