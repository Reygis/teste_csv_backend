import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()
app.use(express.json())
app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(routes)

export default app
