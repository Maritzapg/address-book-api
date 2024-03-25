import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { json } from 'body-parser'
import { connectToDatabase } from './services/database.service'
import { usersRouter } from './routes/users.router'

dotenv.config()

const app = express()

app.use(json())
app.use(cors({ credentials: true }))

const port = process.env.PORT

;(async () => {
  try {
    // Establish the db connection
    await connectToDatabase()

    // Register the routes for the API, leaving /users a the base in the paths
    app.use('/users', usersRouter)

    // Start the server
    app
      .listen(port, () => {
        console.log(`Server started at http://localhost:${port}`)
      })
      .on('error', error => {
        console.error('Error in http server, shutting down', error)
        process.exit()
      })
  } catch (error: any) {
    console.error('Something went wrong', error)
    process.exit()
  }
})()
