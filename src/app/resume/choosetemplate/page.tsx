'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Innerbaner from '@/src/components/Innerbaner';


interface Template {
    id: number;
    name: string;
    description: string;
    image: string;
}

const Page = () => {
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
       <>
       <Innerbaner/>
        <section className='theme-color-custom pyspace'>
            <div className='container'>
                <div className='row text-center'>
                    <h2 className='section-title'>Create Best templates for students</h2>
                    <p>You can always change your template later.</p>
                </div>
                <div className='row'>
                    {templates.map(template => (
                        <div key={template.id} className='col-md-3'>
                            <div className='use-template-main'>
                                <img src={template.image} alt={template.name} />
                                <div className='usetempls'>
                                    {/* <Link href={`/resume/${template.id}`} className='btn'>Use This Template</Link> */}
                                     <Link href={`/resume/selectresume`} className='btn'>Use This Template</Link>
                                </div>
                                <h5>{template.name}</h5>
                                <p>{template.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
       </>
    );
};

export default Page;
