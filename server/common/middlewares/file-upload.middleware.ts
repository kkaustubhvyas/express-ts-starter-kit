import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import path from 'path';
import multer, { Field } from 'multer';

const upload = multer({ dest: 'uploads/' })

type FileParserOptions = {
  multi?: boolean;
  fieldname: string;
  maxCount?: number
}

export function fileParser(options: FileParserOptions | Field[]) {

  let uploadMiddleware;
  let postParse;
  if (Array.isArray(options)) {
    uploadMiddleware = upload.fields(options)
  } else {
    if (!options.maxCount || options.maxCount > 1) {
      uploadMiddleware = upload.single(options.fieldname)
      postParse = (req: Request, res: Response, next: NextFunction) => {
        try {
          const fileData = req.file ? getFileData(req.file.path) : null
          req.uploads = {
            [options.fieldname]: fileData
          }
          if (req.file)
            fs.unlinkSync(path.join(req.file.path))
          next()
        } catch (e) {
          next(e)
        }
      }
    } else {
      uploadMiddleware = upload.array(options.fieldname, options.maxCount)
    }
  }

  return [uploadMiddleware, postParse]
}

const getFileData = (filePath: string) => {
  const fileReadStream = fs.readFileSync(path.join(filePath))
  const fileContent = fileReadStream.toString()
  const fileData = fileContent
  return fileData
};
