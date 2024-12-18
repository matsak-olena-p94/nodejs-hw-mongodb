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
            return res.status(404).json({
                status: 404,
                message: `Contact with id=${id} not found`,
            });
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id=${id}!`,
            data,
        });
    };