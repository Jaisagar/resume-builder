'use client';
import Priviewresume from '../../public/img/priview-resume-template.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faLinesLeaning, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import Link from 'next/link';

type ProfeCard = {
  id: number;
  title: string;
  description: string;
  icons: string;
};

// Icon map: maps string names to icon definitions
const iconMap: Record<string, IconDefinition> = {
  faFile,
  faLinesLeaning,
  faProjectDiagram,
};

export default function Profetionalcard() {
  const [ProfeCards, setPosts] = useState<ProfeCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/profetionalcard');
      const data: ProfeCard[] = await res.json();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className='space'>
        <div className='container'>
          <div className='row text-center'>
            <h2>
              Professional Resume & Cover Letter Tools
              For Any Job
            </h2>
          </div>
          <div className='row'>
            {ProfeCards.map((ProfeCard) => (
              <div className='col-md-4 cardprofetional' key={ProfeCard.id}>
                <div className='card-icons'>
                  <FontAwesomeIcon icon={iconMap[ProfeCard.icons] || faFile} />
                </div>
                <div className='content-card'>
                  <h4>{ProfeCard.title}</h4>
                  <p>{ProfeCard.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='priviewresume-tec'>
            <Image src={Priviewresume} alt='' />
            <div className='resume-btn'>
              <Link href={`/resume`} className='btn'> Create your resume now</Link>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
