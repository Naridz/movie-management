import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import movieRoutes from './routes/movieRoutes'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/movies', movieRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})