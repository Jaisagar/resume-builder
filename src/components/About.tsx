import Image from 'next/image'
import React from 'react'
import About12 from '../../public/img/about.jpg';
const About = () => {
  return (
    <>
      <section className="space">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>About Us </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam soluta temporibus, quaerat voluptatum totam porro deleniti sapiente eos officia, nobis illo maiores? Id asperiores illum, alias non molestiae recusandae provident.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam soluta temporibus, quaerat voluptatum totam porro deleniti sapiente eos officia, nobis illo maiores? Id asperiores illum, alias non molestiae recusandae provident.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam soluta temporibus, quaerat voluptatum totam porro deleniti sapiente eos officia, nobis illo maiores? Id asperiores illum, alias non molestiae recusandae provident.</p>
            </div>
            <div className="col-md-6">
              <Image src={About12} alt="" />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default About
