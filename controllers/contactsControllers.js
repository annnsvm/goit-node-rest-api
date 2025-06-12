import * as contactsService from '../services/contactsServices.js';

import HttpError from '../helpers/HttpError.js';

import controllerWrapper from '../helpers/controllerWrapper.js';


const getAllContacts = async (req, res) => {
  const result = await contactsService.getContacts();

  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json(result);
};

const deleteContact = (req, res) => {};
const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact,
  createContact: controllerWrapper(createContact),
  updateContact,
};
