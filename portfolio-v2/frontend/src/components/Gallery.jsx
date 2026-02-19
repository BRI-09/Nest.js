import React, { useEffect, useState, useRef } from 'react';
import { fetchGallery } from '../api';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [images,  setImages]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [cur,     setCur]     = useState(0);
  const dragX = useRef(null);

  useEffect(() => {
    fetchGallery().then(setImages).catch(e=>setError(e.message)).finally(()=>setLoading(false));
  }, []);

  const go = (i) => setCur((i + (images.length || 1)) % (images.length || 1));
  const onPD = e => { dragX.current = e.clientX; };
  const onPU = e => {
    if (dragX.current === null) return;
    const d = e.clientX - dragX.current;
    if (d < -40) go(cur + 1);
    if (d >  40) go(cur - 1);
    dragX.current = null;
  };

  return (
    <section className="section" id="gallery">
      <h2 className="section-title">Gallery</h2>
      {loading && <div className={styles.center}><span className="spinner" style={{width:28,height:28,borderWidth:3}} /></div>}
      {error   && <div className="alert alert-error">⚠ {error}</div>}
      {!loading && !error && (
        <div className={styles.layout}>
          {/* Main slider */}
          <div className={styles.slider}>
            <div
              className={styles.viewport}
              onPointerDown={onPD} onPointerUp={onPU}
            >
              <div className={styles.track} style={{transform:`translateX(-${cur*100}%)`}}>
                {images.map(img => (
                  <figure key={img.id} className={styles.slide}>
                  {img.type === 'video' ? (
                    <video 
                      src={img.src} 
                      controls 
                      autoPlay  
                      loop
                      className={styles.video}
                    />
                  ) : (
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  )}
                </figure>
                ))}
              </div>
              <button className={`${styles.arr} ${styles.prev}`} onClick={()=>go(cur-1)}>‹</button>
              <button className={`${styles.arr} ${styles.next}`} onClick={()=>go(cur+1)}>›</button>
            </div>
            <div className={styles.dots}>
              {images.map((_,i)=>(
                <button key={i} className={`${styles.dot} ${i===cur?styles.dotActive:''}`} onClick={()=>go(i)} />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbs}>
            {images.map((img,i) => (
              <button key={img.id} className={`${styles.thumb} ${i===cur?styles.thumbActive:''}`} onClick={()=>go(i)}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
