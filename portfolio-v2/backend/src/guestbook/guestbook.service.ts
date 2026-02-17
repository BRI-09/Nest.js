import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../supabase';
import { CreateGuestbookDto, UpdateGuestbookDto } from './guestbook.dto';

const TABLE = 'guestbook';

@Injectable()
export class GuestbookService {

  // ─── GET all entries (newest first) ────────────────────────────────────────
  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // ─── GET single entry by id ─────────────────────────────────────────────────
  async findOne(id: string) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Entry ${id} not found`);
    return data;
  }

  // ─── POST create new entry ──────────────────────────────────────────────────
  async create(dto: CreateGuestbookDto) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([{
        name:       dto.name,
        message:    dto.message,
        emoji:      dto.emoji || '👋',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // ─── PUT update message by id ───────────────────────────────────────────────
  async update(id: string, dto: UpdateGuestbookDto) {
    // Verify it exists first
    await this.findOne(id);

    const { data, error } = await supabase
      .from(TABLE)
      .update({ message: dto.message, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // ─── DELETE entry by id ─────────────────────────────────────────────────────
  async remove(id: string) {
    await this.findOne(id); // throws 404 if not found

    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);

    if (error) throw new InternalServerErrorException(error.message);
    return { success: true, message: `Entry ${id} deleted.` };
  }
}
