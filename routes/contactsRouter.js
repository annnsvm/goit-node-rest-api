import express from 'express';
import contactsControllers, {
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAllContacts);

contactsRouter.get('/:id', contactsControllers.getOneContact);

contactsRouter.delete('/:id', contactsControllers.deleteContactById);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  contactsControllers.updateContactById
);

contactsRouter.patch(
  '/:contactId/favorite',
  validateBody(updateStatusSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
