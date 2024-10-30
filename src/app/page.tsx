"use client";

import React, { useEffect, useRef, useState } from 'react';
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

import SlideInSection from '@/components/SlideInSection';
import SpinningDoorCard from '@/components/SpinningFeatureCardComponent';

export default function HomePage() {
  const images = [
    { src: image1, width: 800, height: 600 },
    { src: image2, width: 800, height: 600 },
    { src: image3, width: 800, height: 600 },
    { src: image4, width: 800, height: 600 },
    { src: image5, width: 800, height: 600 },
  ];

  const features = [
    {
      title: "Innovative 3D and virtual tour solutions",
      description: "We specialize in creating interactive 3D models and virtual tours that bring your properties to life. Our cutting-edge technology allows potential buyers to explore homes from anywhere, providing an immersive experience that enhances engagement and interest.",
    },
    {
      title: "Accelerated sales process",
      description: "Our systems are designed to streamline the sales process, helping you close deals faster. By integrating advanced analytics and user-friendly interfaces, we ensure that your properties are showcased effectively, leading to quicker sales and satisfied clients.",
    },
    {
      title: "Expanding your market reach",
      description: "We are committed to continuous innovation. Our future plans include developing a comprehensive platform that will expand your reach across Europe, connecting you with a broader audience and increasing your market potential.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 rounded-xl p-8 backdrop-blur-sm" style={{ minHeight: '700px' }}>
              {/* Left content */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Interactive 3D Experience
                </h2>
                <p className="text-xl text-white">
                  Take a virtual tour of your building, explore every detail before you buy. Our interactive 3D solution lets you see your future home from any angle.
                </p>
                <ul className="space-y-3 text-white">
                  {['Explore all floor plans', 'View from any angle', 'Walkthrough different apartments', 'Check amenities location'].map((feature, index) => (
                    <li key={index} className="flex items-center">
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
                  onClick={() => window.location.href = '/3d'}
                >
                  View full 3D tour 
                </Button>
              </div>

              {/* Right content */}
              <div className="w-full md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <View3DSmall />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Why choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SpinningDoorCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section>
          <Carousel images={images} visibleItems={3} height={"400px"} />
        </section>

        {/* Call to Action Section */}
        <SlideInSection className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to find your dream home?</h2>
            <p className="text-xl mb-8">Browse our collection of apartments and find the perfect fit for you.</p>
            <Button 
              size="large"
              className="mt-8"
              onClick={() => window.location.href = '/3d'}
            >
              View Apartments
            </Button>
          </div>
        </SlideInSection>

        {/* Featured Apartment Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/cta-first-page.jpeg"
                alt="Featured Apartment"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transform your real estate marketing with our 3D websites and marketing platform suite</h3>
              <p className="text-xl mb-8 text-gray-800">
                Unlock the power of 3D visualization. Engage buyers, accelerate sales, and expand your reach with our custom 3D website solutions.
              </p>
              <ul className="text-left mx-auto mb-8 max-w-lg text-gray-600">
                <li className="mb-2">- 3D visualization makes it easier for customers to imagine the house, which speeds up the purchasing decision-making process. Potential clients can evaluate properties more accurately without visiting the property in person.</li>
                <li className="mb-2">- A website with interactive visualizations increases the number of sales leads because more people interested in modern and transparent solutions visit the website.</li>
                <li className="mb-2">- Interactive and engaging 3D visualization can attract users for longer, which can improve the website's SEO metrics. A better understanding of the product can increase the number of inquiries and closing of sales.</li>
              </ul>
              <Button
                size="large"
                className="mt-8"
                onClick={() => window.open('https://calendly.com/mstachura-deeptechlabs/30min', '_blank', 'noopener,noreferrer')}
              >
                Contact us - Schedule a meeting
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
