import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  private readonly images = [
  { id: 1, title: 'My Cat',   alt: 'A cute cat',    src: '/assets/cat.jpg',    category: 'personal', type: 'image' },
  { id: 2, title: 'try me',  alt: 'Video blog',    src: '/assets/karaoke.mp4',   category: 'personal', type: 'video' },
  { id: 3, title: 'Flowers',  alt: 'Flowers',       src: '/assets/flowers.jpg', category: 'nature',  type: 'image' },
  { id: 4, title: 'Sunset',   alt: 'Golden sunset', src: '/assets/sunset.mp4', category: 'nature',  type: 'image' },
  { id: 5, title: 'Me',    alt: 'A photo of me',     src: '/assets/me3.jpg',     category: 'personal',  type: 'image' },
  { id: 6, title: 'Hobby',    alt: 'Crocheting',     src: '/assets/crochet.jpg',     category: 'personal',  type: 'image' },
  { id: 7, title: 'Hubby',    alt: 'My hubby',       src: '/assets/hoshina.jpg',     category: 'personal',  type: 'image' },
  { id: 8, title: 'Saikii',    alt: 'My hubby2',     src: '/assets/saiki.jpg',     category: 'personal',  type: 'image' },
  { id: 9, title: 'My hubby',  alt: 'Video',    src: '/assets/hubby.mp4',   category: 'personal', type: 'video' },
  ];

  findAll() { return this.images; }
  findByCategory(cat: string) { return this.images.filter(i => i.category === cat); }
}
