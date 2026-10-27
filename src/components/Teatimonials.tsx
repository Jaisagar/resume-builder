'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';

export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  avatar: string;
  rating: number; // 0 to 5
  text: string;
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const res = await axios.get<Testimonial[]>('http://localhost:8000/testimonials');
  return res.data;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };
    fetchData();
  }, []);

  return (
   <>
   <section className='space'>
     <div className='container testimo'>
      <div className='row text-center'>
        <h2 className='section-title'>Clients Testimonials</h2>
      </div>
      <div className='slide-sec'>
        <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={2}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className='row'>
              <div className='col-md-12'>
                <div className='testimonials-sect'>
                  <div className='testimonials-author'>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={90}
                      height={90}
                    />
                    <div className='testimonials-author-title'>
                      <p>{testimonial.text}</p>
                      <p className='rating'>
                        {[...Array(5)].map((_, idx) => (
                          <FontAwesomeIcon
                            key={idx}
                            icon={solidStar}
                            style={{
                              color: idx < testimonial.rating ? '#050505ff' : '#ffad4f',
                              marginRight: '4px',
                            }}
                          />
                        ))}
                      </p>
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.designation}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      <div className='navigation'>
        {/* Navigation buttons */}
      <div className="swiper-nav-wrapper" style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
      </div>
      </div>
    </div>
   </section>
   </>
    
  );
};

export default Testimonials;
