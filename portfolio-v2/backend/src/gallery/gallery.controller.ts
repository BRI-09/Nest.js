import { Controller, Get, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return category ? this.galleryService.findByCategory(category) : this.galleryService.findAll();
  }
}
