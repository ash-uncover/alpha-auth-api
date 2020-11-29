import SCHEMAS, {
  removeReserved,
  removePrivate
} from '../../database/schemas'

import {
  HttpUtils
} from '@uncover/js-utils'

import {
  defaultPost,
  defaultGet,
  defaultPatch,
  defaultDelete,
  handleError
} from '../servlet-base'

import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('REST-RELATIONS')

export const postRelation = async (req, res, next) => {
  defaultPost(SCHEMAS.RELATIONS, req, res, next, null)
}

export const getRelation = async (req, res, next) => {
  defaultGet(SCHEMAS.RELATIONS, req, res, next, null)
}

export const patchRelationAccept = async (req, res, next) => {
  const id = req.params[`${SCHEMAS.RELATIONS.name}Id`]
  try {
    const data1 = await SCHEMAS.RELATIONS.model.findOne({ id }).exec()
    const data2 = await SCHEMAS.RELATIONS.model.findOne({ userId: data1.relationId, relationId: data1.userId }).exec()
    if (!data1) {
      res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
    } else if (!data2) {
      res.sendStatus(HttpUtils.HttpStatus.ERROR)
    } else {
      Object.assign(data1, { status: 'ACTIVE' })
      Object.assign(data2, { status: 'ACTIVE' })
      await data1.save()
      await data2.save()
      res.json(removePrivate(Object.assign({}, data1._doc)))
    }
  } catch (error) {
    handleError(error, res, null)
  }
}

export const patchRelationBlock = async (req, res, next) => {
  req.body = { status: 'BLOCKED' }
  defaultPatch(SCHEMAS.RELATIONS, req, res, next, null)
}

export const patchRelationUnblock = async (req, res, next) => {
  req.body = { status: 'ACTIVE' }
  defaultPatch(SCHEMAS.RELATIONS, req, res, next, null)
}

export const deleteRelation = async (req, res, next) => {
  const id = req.params[`${SCHEMAS.RELATIONS.name}Id`]
  try {
    const data1 = await SCHEMAS.RELATIONS.model.findOne({ id })
    await SCHEMAS.RELATIONS.model.deleteOne({ id })
    await SCHEMAS.RELATIONS.model.deleteOne({ userId: data1.relationId, relationId: data1.userId })
    res.sendStatus(HttpUtils.HttpStatus.REMOVED)
  } catch (error) {
    handleError(error, res, null)
  }
}

const addRoutes = (app) => {
  app.post('/rest/relations/', postRelation)
  app.get('/rest/relations/:relationId', getRelation)
  app.patch('/rest/relations/:relationId/accept', patchRelationAccept)
  app.patch('/rest/relations/:relationId/block', patchRelationBlock)
  app.patch('/rest/relations/:relationId/unblock', patchRelationUnblock)
  app.delete('/rest/relations/:relationId', deleteRelation)
}

export default addRoutes

