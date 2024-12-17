import { Schema, model } from "mongoose";

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
},
{    timestamps: true,
    versionKey: false,
},
);

const ContactCollection = model("contact", connectShchema);

export default ContactCollection;
