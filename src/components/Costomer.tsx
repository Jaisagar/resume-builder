"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export interface Brand {
  id: number;
  name: string;
  image: string;
}
const Customer: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('http://localhost:8000/brands');
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="space">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <h3>Our Customers hired by</h3>
          </div>
          <div className="col-md-9">
            <div className="customers-brand">
              <ul>
                {brands.map((brand) => (
                  <li key={brand.id}>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={100}
                      height={50}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
