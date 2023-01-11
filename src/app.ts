import express from 'express'
import 'reflect-metadata'
import 'express-async-errors'
import sessionRoutes from './routes/session.routes'
import handleError from './errors/handleErrors'

const app = express()
app.use(express.json())

// app.use('/users', userRoutes)
app.use('/session', sessionRoutes)
// app.use('/donations', donationRoutes)
// app.use('/posts', postRoutes)

app.use(handleError)

export default app