import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  private readonly images = [
    { id: 1, title: 'My Cat',   alt: 'A cute cat',        src: '/assets/cat.jpg',     category: 'personal' },
    { id: 2, title: 'Flowers',  alt: 'Beautiful flowers', src: '/assets/flowers.jpg', category: 'nature'   },
    { id: 3, title: 'Orchid',   alt: 'Orchid flower',     src: '/assets/orchid.jpg',  category: 'nature'   },
    { id: 4, title: 'Sunset',   alt: 'Golden sunset',     src: '/assets/sunset.jpg',  category: 'nature'   },
    { id: 5, title: 'Me',    alt: 'A photo of me',     src: '/assets/me3.jpg',     category: 'personal' },
    { id: 6, title: 'Hobby',    alt: 'Crocheting',     src: '/assets/crochet.jpg',     category: 'personal' },
    { id: 7, title: 'Hubby',    alt: 'My hubby',     src: '/assets/hoshina.jpg',     category: 'personal' },
    { id: 8, title: 'Saikii',    alt: 'My hubby2',     src: '/assets/saiki.jpg',     category: 'personal' },
  ];

  findAll() { return this.images; }
  findByCategory(cat: string) { return this.images.filter(i => i.category === cat); }
}
