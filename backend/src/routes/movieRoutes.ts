import { Router } from 'express'
import { createMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movieController'
import { authenticateToken, onlyManager } from '../middleware/authMiddleware'

const router = Router()

router.post('/', authenticateToken, createMovie)
router.get('/', authenticateToken, getAllMovies)
router.get('/:id', authenticateToken, getMovieById)
router.put('/:id', authenticateToken,updateMovie)
router.delete('/:id',authenticateToken, onlyManager ,deleteMovie)

export default router