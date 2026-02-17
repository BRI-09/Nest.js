import {
  Controller, Get, Post, Put, Delete,
  Param, Body, HttpCode, HttpStatus,
} from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto, UpdateGuestbookDto } from './guestbook.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  // GET /api/guestbook  ── list all entries
  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  // GET /api/guestbook/:id  ── single entry
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbookService.findOne(id);
  }

  // POST /api/guestbook  ── sign the guestbook
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateGuestbookDto) {
    return this.guestbookService.create(dto);
  }

  // PUT /api/guestbook/:id  ── edit a message
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGuestbookDto) {
    return this.guestbookService.update(id, dto);
  }

  // DELETE /api/guestbook/:id  ── remove an entry
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.guestbookService.remove(id);
  }
}
