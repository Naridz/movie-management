import { Request, Response } from 'express'
import { PrismaClient, Rating } from '@prisma/client'
import { AuthenticatedRequest } from '../middleware/authMiddleware'

const prisma = new PrismaClient()

// post
export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, year, rating} = req.body
    
    if (!title || !year || !rating) {
      return res.json({status:'empty', message: 'All input are required' })
    }
    
    if (!Object.values(Rating).includes(rating)) {
      return res.status(400).json({ message: `Invalid rating. Allowed: ${Object.values(Rating).join(', ')}` })
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        year,
        rating,
      },
    })

    return res.json({status:'ok', message: 'Movie created successfully.', movie })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// get all
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movie.findMany()
    return res.json({status:'ok',  movies })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// get by id
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const movieId = parseInt(req.params.id!)

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    })

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({status:'ok', movie })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// update
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const movieId = parseInt(id!)

    const { title, year, rating } = req.body

    if (!title || !year || !rating) {
      return res.json({status:'empty', message: 'All input are required' })
    }
    
    if (rating && !Object.values(Rating).includes(rating)) {
      return res.status(400).json({ message: `Invalid rating. Allowed values: ${Object.values(Rating).join(', ')}` })
    }

    const existingMovie = await prisma.movie.findUnique({ where: { id: movieId } })
    if (!existingMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        title,
        year,
        rating,
      },
    })

    return res.json({status:'ok', message: 'Movie updated successfully', movie: updatedMovie })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// delete
export const deleteMovie = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params
    const movieId = parseInt(id!)

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    })

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    await prisma.movie.delete({
      where: { id: movieId },
    })

    return res.json({ message: 'Movie deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}