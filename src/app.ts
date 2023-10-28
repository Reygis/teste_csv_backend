import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({ createParentPath: true }))
app.use(cors())
app.use(routes)

export default app
