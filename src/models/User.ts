import { ObjectId } from 'mongodb'

interface User {
  _id?: ObjectId
  givenName: string
  familyName: string
  nickName: string
  emails: Email[]
  phones: Phone[]
}

interface Email {
  label: string
  address: string
}

interface Phone {
  label: string
  number: string
}

export { User }
