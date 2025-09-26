import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body
    
    if (!username || !password) {
      return res.json({ status: 'empty', message: 'Username and password are required' })
    }
    
    const userExist = await prisma.user.findUnique({
      where: { username },
    })
    if (userExist) {
      return res.json({ status: 'exist', message: 'Username already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'FLOORSTAFF'
      },
    })
    
    return res.json({status:'ok', message: 'Registered successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

// login

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.json({status:'empty', message: 'Username and password are required.' })
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      return res.json({status:'error', message: 'Invalid username or password.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.json({status:'error', message: 'Invalid username or password.' })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.json({
      message: 'Login success',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}