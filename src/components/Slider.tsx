
'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

type Slide = {
  id: number;
  title: string;
  image: string;
  description:string;
  subtitle:string
};

const Slider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/slides')
      .then(res => res.json())
      .then(data => setSlides(data));
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}   // Add Navigation here
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}  // Enable navigation arrows
      loop={true}
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div style={{ textAlign: 'center' }}>
            <img src={slide.image} alt={slide.title} style={{ width: '100%', height: 'auto' }} />
          <div className='hero-content'>
            <h2>{slide.title}</h2>
            <h5>{slide.subtitle}</h5>
            <p>{slide.description}</p>
            <Link href={{}} className='btn'> <FontAwesomeIcon icon={faPhone}/> 9000000000</Link>
             <Link href={{}} className='btn'> <FontAwesomeIcon icon={faEdit}/> Create An Resume</Link>
          </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
