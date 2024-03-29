import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  remove(id: string) {
    return `This action removes a #${id} upload`;
  }
}
