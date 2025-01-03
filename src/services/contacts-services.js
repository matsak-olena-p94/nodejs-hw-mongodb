import ContactCollection from "../db/models/Contact.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = "_id",
    sortOrder = "asc",
    filter = {},
})=> {
    const limit = perPage;
    const skip = (page - 1) * limit;
    const contactsQuery = ContactCollection.find();
    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
      }
    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
      }
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder});
    const contactsCount = await ContactCollection.find().merge(contactsQuery).countDocuments();
    const paginationData = calcPaginationData(contactsCount, perPage, page);
    
    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
    const {upsert = false} = options;
    const result = await ContactCollection.findOneAndUpdate({_id}, payload, {
        upsert,
        includeResultMetadata: true,
    });

    if(!result || !result.value) return null;

    const isNew = Boolean(result.lastErrorObject.upserted);
    return {
        isNew,
        data: result.value,
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);