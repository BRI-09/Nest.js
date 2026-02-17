import { Module } from '@nestjs/common';
import { GuestbookModule } from './guestbook/guestbook.module';
import { SkillsModule }   from './skills/skills.module';
import { GalleryModule }  from './gallery/gallery.module';
import { ContactModule }  from './contact/contact.module';

@Module({
  imports: [GuestbookModule, SkillsModule, GalleryModule, ContactModule],
})
export class AppModule {}
