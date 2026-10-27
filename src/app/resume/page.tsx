import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Resumeset from '../../../public/img/usetemp4.png'
import Innerbaner from '@/src/components/Innerbaner'
const Page = () => {
  return (
    <>
      <Innerbaner />
      <section className='space'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <div className='resume-steps'>
                <h2> Create Resume Just Three Simple Steps</h2>
                <ul>
                  <li>
                    <span className=''>01</span>
                    <h5>Gather Your Information</h5>
                  </li>
                  <li>
                    <span className=''>02</span>
                    <h5>Choose a Format and Fill It In</h5>
                  </li>
                  <li>
                    <span className=''>03</span>
                    <h5>Review and Export</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='resume-steps'>
                <Image src={Resumeset} alt='' />
                <Link href={`/resume/experiencelevel`} className='btn'>Create My Resume</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
