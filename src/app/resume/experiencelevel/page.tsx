'use client'

import Innerbaner from '@/src/components/Innerbaner'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const experienceLevels = [
    { value: 'no-experience', label: 'No Experience' },
    { value: 'under-3-years', label: 'Less than 3 years' },
    { value: '3-5-years', label: '3-5 Years' },
    { value: '5-10-years', label: '5-10 Years' },
    { value: '10-plus-years', label: '10+ Years' },
]

const Page = () => {
    const router = useRouter()
    const [selectedLevel, setSelectedLevel] = useState('')

    const handleContinue = () => {
        if (!selectedLevel) return
        router.push(`/resume/choosetemplate?experienceLevel=${selectedLevel}`)
    }

    return (
        <>
            <Innerbaner />
            <section className='space experiencelevel'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2>How Many long have you been working?</h2>
                            <p>We'll find the best templates layout resume for your experience level.</p>
                            <ul>
                                {experienceLevels.map((level) => (
                                    <li key={level.value} className={selectedLevel === level.value ? 'selected' : ''}>
                                        <button
                                            type="button"
                                            aria-pressed={selectedLevel === level.value}
                                            onClick={() => setSelectedLevel(level.value)}
                                        >
                                            {level.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="btn" onClick={handleContinue} disabled={!selectedLevel}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page
