import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  private readonly images = [
  { id: 1, title: 'My Cat',   alt: 'A cute cat',    src: '/assets/cat.jpg',    category: 'personal', type: 'image' },
  { id: 2, title: 'try me',  alt: 'karaoke',    src: '/assets/karaoke.mp4',   category: 'personal', type: 'video' },
  { id: 3, title: 'Flowers',  alt: 'Flowers',       src: '/assets/flowers.jpg', category: 'nature',  type: 'image' },
  { id: 4, title: 'Cat2',   alt: 'cat', src: '/assets/cat2.jpg', category: 'nature',  type: 'image' },
  { id: 5, title: 'Cat3',    alt: 'cat2',     src: '/assets/cat3.jpg',     category: 'personal',  type: 'image' },
  { id: 6, title: 'Hobby',    alt: 'Crocheting',     src: '/assets/crochet.jpg',     category: 'personal',  type: 'image' },
  { id: 7, title: 'Hubby',    alt: 'My hubby',       src: '/assets/hoshina.jpg',     category: 'personal',  type: 'image' },
  { id: 8, title: 'Saikii',    alt: 'My hubby2',     src: '/assets/saiki.jpg',     category: 'personal',  type: 'image' },
  ];

  findAll() { return this.images; }
  findByCategory(cat: string) { return this.images.filter(i => i.category === cat); }
}
