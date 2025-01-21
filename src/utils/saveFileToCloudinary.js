import {v2 as cloudinary} from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import {unlink} from "node:fs/promises";


    const cloud_name = getEnvVar("CLOUD_NAME");
    const api_key = getEnvVar("API_KEY");
    const api_secret = getEnvVar("API_SECRET");

    cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
    });

export const saveFileToCloudinary = async file => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder: "photo"
    });
    await unlink(file.path);
    return response.secure_url;
};