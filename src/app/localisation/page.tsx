"use client"

import React from 'react';
import PhotoTextCardLeft from '@/components/photo-text-card-left';
import PhotoTextCard from '@/components/photo-text-card';
import Button from '@/components/button';

// You'll need to import your actual images
import locationImage1 from '@/assets/example-image-1.jpg';
import locationImage2 from '@/assets/example-image-2.jpg';
import locationImage3 from '@/assets/example-image-3.jpg';

export default function LocalizationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Our Prime Locations</h1>
          <p className="text-xl text-gray-600 mb-8">Discover the perfect setting for your new home</p>
          <Button size="large">Explore All Locations</Button>
        </section>
        
        {/* Locations Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="space-y-16">
            <PhotoTextCardLeft
              image={locationImage1}
              title="Downtown Living"
              description="Experience the vibrancy of city life with our downtown apartments. Close to restaurants, shopping, and entertainment, you'll never miss a beat."
              buttonText="View Downtown Apartments"
              onButtonClick={() => console.log('View Downtown Apartments')}
            />
            
            <PhotoTextCard
              image={locationImage2}
              title="Suburban Tranquility"
              description="Escape the hustle and bustle in our peaceful suburban locations. Enjoy spacious living with easy access to parks and top-rated schools."
              buttonText="Explore Suburban Homes"
              onButtonClick={() => console.log('Explore Suburban Homes')}
            />
            
            <PhotoTextCardLeft
              image={locationImage3}
              title="Beachfront Paradise"
              description="Wake up to stunning ocean views in our beachfront properties. Luxurious living meets natural beauty in these exclusive locations."
              buttonText="Discover Beachfront Properties"
              onButtonClick={() => console.log('Discover Beachfront Properties')}
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Find Your Perfect Location</h2>
            <p className="text-xl mb-8">Our team of experts is ready to help you find the ideal location for your lifestyle.</p>
            <Button variant="secondary" size="large">Contact Us Today</Button>
          </div>
        </section>
      </main>
    </div>
  );
}