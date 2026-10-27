// app/help/page.tsx or pages/help.tsx (depending on your Next.js version)
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type HelpItem = {
  id: number
  title: string
  description: string
  image: string
}

const Help = () => {
  const [items, setItems] = useState<HelpItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/helpItems')
      const data = await res.json()
      setItems(data)
    }

    fetchData()
  }, [])

  return (
    <section className='space'>
      <div className='container'>
        <div className='row text-center'>
            <h2>How Can We Help You?</h2>
        </div>
        <div className='row'>
        {items.map((item) => (
          <div className='col-md-4' key={item.id}>
            <div className='help-wapper'>
              <div className='help-icons'>
                <Image src={item.image} alt={item.title} width={64} height={64} />
              </div>
              <div className='help-content'>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Help
