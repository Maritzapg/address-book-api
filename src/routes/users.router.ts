/*
  The router for inserting and retrieving user data from the database
*/

import express, { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { User } from '../models/User'
import { dbCollections } from '../services/database.service'
import { MONGO_COLLECTIONS } from '../services/constants'

// Global Config
export const usersRouter = express.Router()
usersRouter.use(express.json())

const collectionName = MONGO_COLLECTIONS.users

/**
 * Finds a user in the database
 * @param _id User id
 * @returns A user information
 */
const getUserById = async (_id: string = '') => {
  if (_id === '') {
    return new Error('user ID cannot be empty')
  }
  try {
    const query = { _id: new ObjectId(_id) }
    const user = (await dbCollections.get(collectionName)?.findOne(query)) as unknown as User

    if (user) {
      return user
    }
  } catch (error) {
    return error
  }
}

/**
 * Update a user from the database, it does not create a new one in case it doesn't find the _id
 * @param user New user information to be updated
 * @param _id id of user to be updated
 * @returns A list of all users in the database
 */
const updateUser = async (user: User, _id: string) => {
  delete user._id
  return dbCollections.get(collectionName)?.replaceOne({ _id: new ObjectId(_id) }, user, { upsert: false })
}

// GET
/**
 * Retrieve a list of all users data in the database
 * @param req The api request object
 * @param res The api response object
 * @returns A list of all users in the database
 */
usersRouter.get('', async (_req: Request, res: Response) => {
  try {
    const users = (await dbCollections.get(collectionName)?.find({}).toArray()) as unknown as User[]

    res.status(200).send(users)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})

// GET
/**
 * Retrieve a single document of user data by the mongo object id
 * @param req The api request object
 * @param res The api response object
 * @returns A single document of user data from the database
 */
usersRouter.get('/:id', async (_req: Request, res: Response) => {
  const id = _req?.params?.id

  try {
    const result = await getUserById(id)

    if (result) {
      res.status(200).send(result)
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${_req.params.id}`)
  }
})

// POST
/**
 * Insert a new or modify an existing document of user data in database
 * @param req The api request object
 * @param res The api response object
 * @returns The result of successfully or failing to insert into the database
 */
usersRouter.post('', async (_req: Request, res: Response) => {
  try {
    const user = _req.body as User
    let id = user?._id?.toString() || null

    if (id) {
      await updateUser(user, id)
      res.status(200).send(id)
    } else {
      const result = await dbCollections.get(collectionName)?.insertOne(user)
      id = result?.insertedId.toString() || ''
      res.status(201).send(id)
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

/**
 * Remove a user, by id, from the database
 * @param req The api request object
 * @param res The api response object
 * @returns A confirmation of the operation with the number of modified objects
 */
usersRouter.delete('', async (_req: Request, res: Response) => {
  try {
    const { id } = _req.body
    const result = await dbCollections.get(collectionName)?.deleteOne({ _id: new ObjectId(id) })
    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})
