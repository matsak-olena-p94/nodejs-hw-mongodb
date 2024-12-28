    import createError from "http-errors";
    import * as contactServices from "../services/contacts-services.js";

    export const getContactsController = async (req, res)=> {
        const data = await contactServices.getContacts();

        res.json({  
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    };

    export const getContactsByIdController = async(req, res)=> {
        const {id} = req.params;

        const data = await contactServices.getContactsById(id);

        if(!data) {
            throw createError(404, `Contact with id=${id} not found`);
            // const error = new Error(`Contact with id=${id} not found`);
            // error.status = 404;
            // throw error;
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id=${id}!`,
            data,
        });
    };

    export const addContactsController = async(req, res)=> {
        const data = await contactServices.addContact(req.body);

        res.status(201).json({
            status: 201,
            message: "Successfully created a contact!",
            data,
        });
    };

    export const patchContactController = async(req, res)=> {
        const {id} = req.params;
        const result = await contactServices.updateContact(id, req.body);

        if(!result) {
            throw createError(404, `Contact with id=${id} not found`);
        }

    res.status(200).json({
            status: 200,
            message: "Successfully patched a contact!",
            data: result.data,
    });
        };

        export const deleteContactController = async (req, res)=> {
            const {id} = req.params;
            const data = await contactServices.deleteContact({_id: id});
            if(!data) {
                throw createError(404, `Contact with id=${id} not found`);
            }

            res.status(204).json({
                status: 204,
                message: "Delete success"
            });
        };