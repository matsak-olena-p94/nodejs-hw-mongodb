import {v2 as cloudinary} from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import {unlink} from "node:fs/promises";


    const CLOUD_NAME = getEnvVar("CLOUD_NAME");
    const API_KEY = getEnvVar("API_KEY");
    const API_SECRET = getEnvVar("API_SECRET");

    cloudinary.config({
        CLOUD_NAME,
        API_KEY,
        API_SECRET,
    });

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder: "photo"
    });
    await unlink(file.path);
    return response.secure_url;
};