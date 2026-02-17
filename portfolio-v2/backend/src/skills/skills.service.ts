import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  private readonly skills = [
    { id: 1, name: 'Python',     level: 'intermediate', category: 'language', description: 'Can do the basics',               iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { id: 2, name: 'HTML',       level: 'intermediate', category: 'language', description: 'Still learning',                  iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { id: 3, name: 'CSS',        level: 'intermediate', category: 'language', description: 'Also learning it',                iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { id: 4, name: 'JavaScript', level: 'beginner',     category: 'language', description: 'Implementing on my website',      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { id: 5, name: 'Java',       level: 'intermediate', category: 'language', description: 'Can do the basics',               iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { id: 6, name: 'Linux',      level: 'beginner',     category: 'tool',     description: 'Some Linux commands',             iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { id: 7, name: 'React',      level: 'beginner',     category: 'language', description: 'Building this portfolio!',        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { id: 8, name: 'NestJS',     level: 'beginner',     category: 'language', description: 'REST API for this portfolio',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
    { id: 9, name: 'Supabase',   level: 'beginner',     category: 'tool',     description: 'Database for guestbook',          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  ];

  findAll() { return this.skills; }
  findOne(id: number) { return this.skills.find(s => s.id === id); }
}
