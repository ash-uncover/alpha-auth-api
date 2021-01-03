import {
  UserModel,
  RelationModel,
  MessageModel,
  ThreadModel
} from '../../database/schemas'

export const viewer = async () => {
  const id = 'user1'

  const userData = await UserModel.findOne({ id })

  const relationsData = await RelationModel.find({ userId: id })
  const relations = await Promise.all(relationsData.map(async ({ id, status, relationId }) => {
    const friendData = await UserModel.findOne({ id: relationId })
    return {
      id,
      status,
      user: buildUser(friendData)
    }
  }))

  const threadsData = await ThreadModel.find({ userId: id })
  const threads = threadsData.map(async (threadData) => {
    const thread = buildThread(threadData)
    thread.users = await Promise.all(thread.users.map(async (id) => {
      const threadUserData = await UserModel.findOne({ id })
      return buildUser(threadUserData)
    }))
    return thread
  })

  return Object.assign(
    buildUser(userData),
    {
      relations,
      threads
    }
  )
}

export const user = async (args) => {
  const userData = await UserModel.findOne(args)
  return buildUser(userData)
}


export const buildUser = (userData) => ({
  id: userData.id,
  name: userData.name,
  avatar: userData.avatar,
  description: userData.description
})

export const buildRelation = (relationData) => ({
  id: relationData.id,
  userId: relationData.userId,
  relationId: relationData.relationId,
  status: relationData.status
})

export const buildThread = (threadData) => ({
  id: threadData.id,
  name: threadData.name,
  type: threadData.type,
  users: threadData.userId
})
