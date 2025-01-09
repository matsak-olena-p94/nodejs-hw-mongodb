    import createError from "http-errors";
    import * as contactServices from "../services/contacts-services.js";
    import { parsePaginationParams } from "../utils/parsePaginationParams.js";
    import { parseSortParams } from "../utils/parseSortParams.js";
    import { sortByList } from "../db/models/Contact.js";
    import { patseContactFilterParams } from "../utils/filters/patseContactFilterParams.js";

    export const getContactsController = async (req, res)=> {
        const {page, perPage} = parsePaginationParams(req.query);
        const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
        const filter = patseContactFilterParams(req.query);
        filter.userId = req.user._id;

        const data = await contactServices.getContacts({page, perPage, sortBy, sortOrder, filter});

        res.json({  
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    };

    export const getContactsByIdController = async(req, res)=> {
        const {_id: userId} = req.user;
        const {id: _id} = req.params;

        const data = await contactServices.getContact({_id, userId});

        if(!data) {
            throw createError(404, `Contact with id=${_id} not found`);
            // const error = new Error(`Contact with id=${id} not found`);
            // error.status = 404;
            // throw error;
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id=${_id}!`,
            data,
        });
    };

    export const addContactsController = async(req, res)=> {
        const {_id: userId} = req.user;
        const data = await contactServices.addContact({...req.body, userId});

        res.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data,
        });
    };

    export const patchContactController = async(req, res)=> {
        const {id: _id} = req.params;
        const {_id: userId} = req.user;
        const result = await contactServices.updateContact({_id, userId}, req.body);

        if(!result) {
            throw createError(404, `Contact with id=${_id} not found`);
        }

    res.status(200).json({
            status: 200,
            message: "Successfully patched a contact!",
            data: result.data,
    });
        };

        export const deleteContactController = async (req, res)=> {
            const {id: _id} = req.params;
            const {_id: userId} = req.user;
            const data = await contactServices.deleteContact({_id, userId});
            if(!data) {
                throw createError(404, `Contact with id=${_id} not found`);
            }

            res.status(204).json({
                status: 204,
                message: "Delete success"
            });
        };