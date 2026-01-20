import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
