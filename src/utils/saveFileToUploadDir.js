import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getEnvVar } from "./getEnvVar.js";
import { UPLOADS_DIR, TEMP_UPLOAD_DIR} from "../constants/index.js";

export const saveFileToUploadDir = async (file) => {
    await fs.rename(
      path.join(TEMP_UPLOAD_DIR, file.filename),
      path.join(UPLOADS_DIR, file.filename),
    );
  
    return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
  };