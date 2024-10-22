"use client";

import React from 'react';
import Button from '@/components/button';
import Image from 'next/image';
import Carousel from "@/components/carousel";
import PhotoTextCard from "@/components/photo-text-card";
import PhotoTextCardLeft from "@/components/photo-text-card-left";
import View3DSmall from '@/3d/View3DSmall';

import image1 from '@/assets/example-image-1.jpg';
import image2 from '@/assets/example-image-2.jpg';
import image3 from '@/assets/example-image-3.jpg';
import image4 from '@/assets/example-image-4.jpg';
import image5 from '@/assets/example-image-5.jpg';

export default function HomePage() {
  const images = [
    { src: image1, width: 800, height: 600 },
    { src: image2, width: 800, height: 600 },
    { src: image3, width: 800, height: 600 },
    { src: image4, width: 800, height: 600 },
    { src: image5, width: 800, height: 600 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <main className="flex-grow">
        {/* Hero Section with 3D Integration */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4 py-20"
          style={{
            backgroundImage: "url('/main-background.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Content */}
          <div className="container mx-auto relative z-10">
            {/* 3D section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 rounded-xl p-8 backdrop-blur-sm" style={{ minHeight: '700px' }}>
              {/* Left content */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Interactive 3D Experience
                </h2>
                <p className="text-xl text-white">
                  Take a virtual tour of our building and explore every detail before your visit. Our interactive 3D model lets you visualize your future home from any angle.
                </p>
                <div className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      'Explore all floor plans',
                      'View from any angle',
                      'Walkthrough different apartments',
                      'Check amenities location',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="large"
                    className="mt-8"
                    onClick={() => window.location.href = '/3d-tour'}
                  >
                    View Full 3D Tour
                  </Button>
                </div>
              </div>

              {/* Right content */}
              <div className="w-full md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <View3DSmall />
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div className="text-center mt-16">
              <h1 className="text-5xl font-bold text-white mb-6">
                Welcome to Our Modern Living Spaces
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover comfort, style, and innovation in every corner.
              </p>
              <Button size="large">Explore Apartments</Button>
            </div>
          </div>
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
          <Carousel images={images} visibleItems={3} height={"400px"} />
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