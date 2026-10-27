import React from 'react'
import Image from 'next/image';
import ComingSoon from '../../../public/img/ComingSoon.jpg'
import InnerBanner from '@/src/components/Innerbaner';

const Page = () => {
  return (
    <>
      <InnerBanner />
      <div className='container'>
        <div className='comingsee'>
          <Image src={ComingSoon} alt="" />
        </div>
      </div>
    </>
  )
}

export default Page
