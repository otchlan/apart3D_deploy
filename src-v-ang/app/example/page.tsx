import React from 'react';
import Button from '@/components/button';
import Image from 'next/image';
import Carousel from "@/components/carousel";
import PhotoTextCard from "@/components/photo-text-card";
import PhotoTextCardLeft from "@/components/photo-text-card-left";

import image1 from '@/assets/example-image-1.jpg'
import image2 from '@/assets/example-image-2.jpg'
import image3 from '@/assets/example-image-3.jpg'
import image4 from '@/assets/example-image-4.jpg'
import image5 from '@/assets/example-image-5.jpg'

export default function HomePage() {

    const images = [
        { src: image1, width: 800, height: 600 },
        { src: image2, width: 800, height: 600 },
        { src: image3, width: 800, height: 600 },
        { src: image4, width: 800, height: 600 },
        { src: image5, width: 800, height: 600 },
      ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Our Modern Living Spaces</h1>
          <p className="text-xl text-gray-600 mb-8">Discover comfort, style, and innovation in every corner.</p>
          <Button size="large">Explore Apartments</Button>
        </section>
        
        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Innovative Designs', 'Prime Locations', 'Smart Home Tech'].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-100 to-indigo-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature}</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
            <Carousel images={images} visibleItems={3} height={"400px"}/>
        </section>
        
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-xl mb-8">Browse our collection of stunning apartments and find the perfect fit for you.</p>
            <Button variant="secondary" size="large">View Apartments</Button>
          </div>
        </section>
        
        {/* Featured Apartment */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Featured Apartment</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/api/placeholder/600/400"
                alt="Featured Apartment"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Penthouse Suite</h3>
              <p className="text-gray-600 mb-6">Experience the epitome of urban living in our luxurious penthouse suite. Panoramic city views, state-of-the-art amenities, and unparalleled comfort await you.</p>
              <Button>Schedule a Viewing</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}