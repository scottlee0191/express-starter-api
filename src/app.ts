import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import api from './api'
import { errorHandler, notFound } from './middlewares'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/v1', api)
app.use(notFound)
app.use(errorHandler)

export default app
