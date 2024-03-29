import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createReadStream, createWriteStream, unlink } from 'fs';

@ApiBearerAuth()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('upload');
    return file.filename;
  }

  @Post('arr-files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileNames = await Promise.all(
      files.map(async (file) => {
        return await this.storeFile(file);
      }),
    );
    return { fileNames };
  }

  private async storeFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const newName = Date.now() + '' + file.originalname;
      const destination = './public/uploads/' + newName;
      // Lưu trữ tệp đã tải lên
      const stream = createReadStream(file.path).pipe(
        createWriteStream(destination),
      );
      stream.on('finish', () => {
        // Xóa tệp tạm sau khi lưu thành công
        unlink(file.path, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newName);
          }
        });
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
