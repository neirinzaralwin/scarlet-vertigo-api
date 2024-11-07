import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const upload = multer({
    //limits: { fileSize: 800000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../images'));
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedFileTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.mimetype.split('/')[1];
        if (allowedFileTypes.includes(fileType)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

export default upload;
