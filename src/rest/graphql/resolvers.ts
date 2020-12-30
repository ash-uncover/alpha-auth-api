import {
  UserModel,
  RelationModel
} from '../../database/schemas'

export const user = async () => {
  const id = 'user1'

  const userData = await UserModel.findOne({ id })
  const relationsData = await RelationModel.find({ userId: id })

  const relations = await Promise.all(relationsData.map(async ({ status, relationId }) => {
    const friendData = await UserModel.findOne({ id: relationId })
    return {
      status,
      user: buildUser(friendData)
    }
  }))

  return Object.assign(
    buildUser(userData),
    { relations }
  )
}

export const loadUser = async (id) => {
  const userData = await UserModel.findOne({ id })
  return buildUser(userData)
}

export const buildUser = (userData) => ({
  id: userData.id,
  name: userData.name,
  avatar: userData.avatar,
  description: userData.description
})

export const loadRelations = async (query) => {
  const relationsData = await RelationModel.find(query)
  return buildUser(relationsData)
}

export const buildRelation = (relationData) => ({
  id: relationData.id,
  userId: relationData.userId,
  relationId: relationData.relationId,
  status: relationData.status
})
