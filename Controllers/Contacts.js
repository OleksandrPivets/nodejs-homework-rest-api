const Contact = require("../models/contact");
const createError = require("../helpers");
const { contactsSchema, favoriteSchema } = require("../Schemas/Schema");

class Contacts {
  async listContacts(req, res, next) {
    try {
      const result = await Contact.find();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getContactById(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw createError(404);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addContact(req, res, next) {
    try {
      const { error } = contactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: "missing required name field" });
        return;
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndDelete(contactId);
      if (!result) {
        throw createError(404);
      }

      res.status(201).json({ message: "Contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    try {
      const { error } = contactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: "missing fields" });
        return;
      }
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
      if (!result) {
        throw createError(404);
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateFavorite(req, res, next) {
    try {
      const { error } = favoriteSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: "missing fields" });
        return;
      }
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body);
      if (!result) {
        throw createError(404);
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Contacts();
