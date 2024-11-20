import multer from 'multer';
import path from 'path';

const configStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), "src", "uploadedFiles"));
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
});

export const fileUpload = multer({ storage: configStorage });