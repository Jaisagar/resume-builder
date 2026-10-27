'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Template {
    id: number;
    name: string;
    description: string;
    image: string;
}

const PickfromTemplates = () => {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await fetch('http://localhost:8000/templates');
                const data = await res.json();
                setTemplates(data);
            } catch (err) {
                console.error('Failed to fetch templates', err);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <section className='theme-color-custom pyspace'>
            <div className='container'>
                <div className='row text-center'>
                    <h2 className='section-title'>Pick from 20 Professional Resume Layout Templates</h2>
                </div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                >
                    {templates.map(template => (
                        <SwiperSlide key={template.id}>
                            <div className='use-template-main'>
                                <img src={template.image} alt={template.name} />
                                <div className='usetempls'>
                                    <Link href={`/resume/${template.id}`} className='btn'>Use This Template</Link>
                                </div>
                                <h5>{template.name}</h5>
                                <p>{template.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PickfromTemplates;
