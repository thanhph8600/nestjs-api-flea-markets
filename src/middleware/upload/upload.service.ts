import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class UploadService {
  async deleteFiles(filePaths: string[]): Promise<void[]> {
    console.log(filePaths);
    const deletionPromises = filePaths.map((filePath) =>
      this.deleteFile(filePath),
    );
    return Promise.all(deletionPromises);
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await unlinkAsync(`./public/uploads/${filePath}`);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }
}
