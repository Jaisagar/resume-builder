"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type Step = {
  id: number
  step: string
  title: string
  description: string
  image: string
}

const Easysteps = () => {
  const [steps, setSteps] = useState<Step[]>([])

  useEffect(() => {
    const fetchSteps = async () => {
      const res = await fetch('http://localhost:8000/steps')
      const data = await res.json()
      setSteps(data)
    }

    fetchSteps()
  }, [])

  return (
    <section className='theme-color-custom pyspace'>
      <div className='container'>
        <div className='row text-center'>
          <h2>Create a Perfect Resume and CV in 4 easy steps:</h2>
        </div>
        <div className='row'>
          {steps.map(({ id, step, title, description, image }) => (
            <div className='col-md-3 d-flex align-items-stretch' key={id}>
              <div className='easysteps'>
                <span className='steps'>{step}</span>
                <div className='images-steps'>
                  <Image src={image} alt={title} className='images-steps-set' width={60} height={60}/>
                </div>
                <div className='steps-content'>
                  <h5>{title}</h5>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Easysteps
