import express from 'express'
import 'reflect-metadata'
import 'express-async-errors'

const app = express()
app.use(express.json())



export default app