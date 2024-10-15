"use client"
import React from 'react';
import useApartments from '@/hooks/useApartments';
import { Apartment } from '@/types/apartment-type';
import View3D from '@/3d/View3D';
import Slider from '@/components/slider';
import LoadingScreen from '@/components/loading-screen';
import Button from '@/components/button';

const Apartments: React.FC = () => {
  const { apartments, loading, error } = useApartments();

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-center text-red-600 text-xl">Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Explore Our Apartments</h1>
          <p className="text-xl text-gray-600 mb-8">Discover your perfect home with our interactive 3D tour and premium apartment options.</p>
        </section>

        {/* 3D Visualization Section */}
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">3D Building Tour</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg mx-auto" style={{ width: '840px', height: '640px' }}>
            <View3D />
          </div>
          <p className="text-center text-gray-600 mt-4">Interact with the 3D model to explore our building layout.</p>
        </section>

        {/* Apartment Preview Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Featured Apartments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Apartment Type {index}</h3>
                  <p className="text-gray-600 mb-4">Experience luxury living in our beautifully designed apartments.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold">Contact for pricing</span>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Find Your Dream Apartment Today</h2>
            <p className="text-xl mb-8">Contact us to schedule a viewing or get more information about our available units.</p>
            <Button variant="secondary" size="large">Contact Us</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Apartments;