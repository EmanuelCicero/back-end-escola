import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => {
  return Math.floor(Math.random() * 10000 + 10000);
}

multer({
  fileFilter: (req, file, cb) => {
    file.mimetype
  }
})

export default {
  fileFilter: (req, file, cb) => {
    if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg'){
      return( cb(new multer.MulterError('Formato de arquivo não suportado')))
    }

    return cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
    },
  })
}