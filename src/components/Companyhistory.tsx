'use client';
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

interface Componyhistori {
    id: number;
    dataset: string;
    title: string;
}
const Companyhistory = () => {
    const [componyhists, setComponyhist] = useState<Componyhistori[]>([]);

    useEffect(() => {
        const fetchComponyhist = async () => {
            try {
                const res = await fetch('http://localhost:8000/componyhistori');
                const data = await res.json();
                setComponyhist(data);
            } catch (err) {
                console.error('Failed to fetch templates', err);
            }
        };

        fetchComponyhist();
    }, []);
    return (
        <>
            <section>
                <div className="container">
                    <div className="row align-itles-center text-center">
                        <h1>Company Timeline</h1>
                    </div>
                    <div className="hestory-main">
                        {componyhists.map((componyhis, index) => (
                            <div key={componyhis.id} className="hestory-items">
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="hestory-date one">
                                            <h6>{componyhis.dataset}</h6>
                                        </div>
                                        <span><FontAwesomeIcon icon={faCalendarDays} /></span>
                                        <div className="hestory-title one">
                                            <h4>{componyhis.title}</h4>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hestory-title two">
                                            <h4>{componyhis.title}</h4>
                                        </div>
                                        <span><FontAwesomeIcon icon={faCalendarDays} /></span>
                                        <div className="hestory-date two">
                                            <h6>{componyhis.dataset}</h6>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Companyhistory