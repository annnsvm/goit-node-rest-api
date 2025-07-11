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

const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found `);
  }

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found `);
  }

  res.json(result);
};

export const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await contactsService.updateStatusContact(contactId, {
    favorite,
  });

  if (!contact) {
    throw HttpError(404, `Contact with id = ${id} not found `);
  }
  res.json(contact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContactById: controllerWrapper(deleteContactById),
  createContact: controllerWrapper(createContact),
  updateContactById: controllerWrapper(updateContactById),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
