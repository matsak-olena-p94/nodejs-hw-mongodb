import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const connectShchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    isFavourite:{
        type: Boolean,
        default: false,
        required: true,
    },
    contactType:{
        type: String,
        required: true,
        enum: ['work', 'home', 'personal'],
        default: "personal"
    },
    photo:{
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      }
},
{    timestamps: true,
    versionKey: false,
},
);

connectShchema.post("save", handleSaveError);

connectShchema.pre("findOneAndUpdate", setUpdateSettings);

connectShchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["_id", "name", "phoneNumber", "email", "isFavourite", "contactType"];

const ContactCollection = model("contact", connectShchema);

export default ContactCollection;
