import { diskStorage } from 'multer';

export const storeConfig = (folder: string) =>
  diskStorage({
    destination: './public/uploads/' + folder,
    filename: (req, file, cd) => {
      cd(null, Date.now() + '' + file.originalname);
    },
  });
