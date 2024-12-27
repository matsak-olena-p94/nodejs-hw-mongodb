import {Router} from "express";
import * as contactsController from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
    
    const contactsRouter = Router();

    contactsRouter.get("/", ctrlWrapper(contactsController.getContactsController));

    contactsRouter.get("/:id", ctrlWrapper(contactsController.getContactsByIdController));

    contactsRouter.post("/", ctrlWrapper(contactsController.addContactsController));

    contactsRouter.patch("/:id", ctrlWrapper(contactsController.patchContactController));

    contactsRouter.delete("/:id", ctrlWrapper(contactsController.deleteContactController));



    export default contactsRouter;
