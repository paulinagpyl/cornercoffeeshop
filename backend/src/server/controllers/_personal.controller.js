import * as sql from '../models/personal.model.js'

export const findAll = (req, res) => sql.findAll()
  .then((result) => res.status(200).json({ status: true, code: 200, message: result }))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const findById = (req, res) => sql.findById(req.params.id)
  .then(([result]) => res.status(200).json({ status: true, code: 200, message: result }))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const create = (req, res) => sql.create(req.body)
  .then(([result]) => res.status(201).json({ status: true, code: 201, message: result }))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const updateById = (req, res) => sql.updateById(req.params.id, req.body)
  .then(([result]) => res.status(200).json({ status: true, code: 200, message: result }))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))

export const deleteById = (req, res) => sql.deleteById(req.params.id)
  .then(([result]) => res.status(200).json({ status: true, code: 200, message: result }))
  .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))
