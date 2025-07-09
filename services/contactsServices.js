import Contact from '../models/contact.js';

export const getContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const addContact = (data) => Contact.create(data);

export const deleteContactById = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const updateContactById = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (id, { favorite }) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  await contact.update({ favorite });
  return contact;
};
