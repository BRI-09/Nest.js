import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { supabase } from '../supabase';
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  async create(dto: CreateContactDto) {
    this.logger.log(`📬 Contact from ${dto.name} <${dto.email}>`);

    // Store in Supabase 'contacts' table (optional — create this table too)
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name: dto.name, email: dto.email, message: dto.message }])
      .select()
      .single();

    if (error) {
      // If contacts table doesn't exist yet, still return success
      this.logger.warn('Supabase contacts insert failed:', error.message);
    }

    return {
      success: true,
      message: `Thanks ${dto.name}! I'll get back to you soon. 🐱`,
      id: data?.id,
    };
  }
}
