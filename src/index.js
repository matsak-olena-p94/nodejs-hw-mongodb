import { startServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExist.js";
import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from "./constants/index.js";

const boostrap = async()=> {
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOADS_DIR);
    await initMongoDB();
    startServer();
};

boostrap();

