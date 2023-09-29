import {
  Request,
} from 'express'

import {
  removeReserved,
} from '../database/schemas'

import {
  HttpUtils,
} from '@uncover/js-utils'

import { Logger } from '@uncover/js-utils-logger'
const LOGGER = new Logger('servlet-base')

export interface AuthRequest<A, B, C> extends Request<A, B, C> {
  __context: {
    userId: string
  }
}

export const handleError = (error, res, onError?) => {
  onError ? onError(error) : res.status(HttpUtils.HttpStatus.ERROR).send(error)
}

export const defaultGetAll = async (schema, req, res, next?, onError?) => {
  try {
    const data = await schema.model.find().select('-_id -__v').exec()
    res.json(data)
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultPost = async (schema, req, res, next, onError) => {
  try {
    const dataFormatted = removeReserved(req.body)
    const data = new schema.model(dataFormatted)
    await data.save()
    res.status(HttpUtils.HttpStatus.CREATED).json(data)
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultGet = async (schema, req, res, next, onError) => {
  const id = req.params[`${schema.name}Id`]
  try {
    const data = await schema.model.findOne({ id }).select('-_id -__v').exec()
    data ? res.json(data) : res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultPut = async (schema, req, res, next, onError) => {
  const id = req.params[`${schema.name}Id`]
  try {
    let data = await schema.model.findOne({ id }).exec()
    if (data) {
      Object.assign(data, removeReserved(req.body))
      await data.save()
      data = await schema.model.findOne({ id }).select('-_id -__v').exec()
      data ? res.json(data) : res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
    } else {
      res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
    }
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultPatch = async (schema, req, res, next, onError) => {
  const id = req.params[`${schema.name}Id`]
  try {
    let data = await schema.model.findOne({ id }).exec()
    if (data) {
      Object.assign(data, removeReserved(req.body))
      data = await schema.model.findOne({ id }).select('-_id -__v').exec()
      data ? res.json(data) : res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
    } else {
      res.sendStatus(HttpUtils.HttpStatus.NOT_FOUND)
    }
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultDelete = async (schema, req, res, next, onError) => {
  const id = req.params[`${schema.name}Id`]
  try {
    const { deletedCount } = await schema.model.deleteOne({ id })
    res.sendStatus(deletedCount ? HttpUtils.HttpStatus.REMOVED : HttpUtils.HttpStatus.NOT_FOUND)
  } catch (error) {
    handleError(error, res, onError)
  }
}

export const defaultGetDeep = async (schema, req, res, next, onError) => {
  try {
    const data = await schema.model.find(req.params).select('-_id -__v').exec()
    res.json(data)
  } catch (error) {
    handleError(error, res, onError)
  }
}
