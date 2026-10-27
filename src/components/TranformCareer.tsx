import Link from 'next/link'
import React from 'react'

const TranformCareer = () => {
    return (
        <>
            <section className='space'>
                <div className='container'>
                    <div className='row'>
                        <div className='transform-career text-center'>
                            <h2>Transform your career today and join thousands of satisfied users</h2>
                            <Link href={`/resume`} className='btn'>Try Our Resume Maker</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TranformCareer
