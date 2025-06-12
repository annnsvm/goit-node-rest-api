import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { nanoid } from 'nanoid';

const contactsPath = resolve('db', 'contacts.json');

export const getContacts = async () => {
  const data = await readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await getContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (data) => {
  const contacts = await getContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const deleteContactById = async (id) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const updateContactById = async (id, data) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts, ...data };
  await updateContactById(contacts);
  return contacts[index];
};
