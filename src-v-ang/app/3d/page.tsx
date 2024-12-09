"use client"
import React, {useState, useEffect} from 'react';
import useApartments from '@/hooks/useApartments';
import { Apartment } from '@/types/apartment-type';
import View3D from '@/3d/View3D';
import Slider from '@/components/slider';
import LoadingScreen from '@/components/loading-screen';
import Button from '@/components/button';

const Apartments: React.FC = () => {
  const { apartments, loading, error } = useApartments();

  const [filters, setFilters] = useState({
    price: null,
    roomsMin: null,
    roomsMax: null,
    floorMin: null,
    floorMax: null,
    field: null
  });

  // Slider min/max state
  const [ranges, setRanges] = useState({
    price: { min: 0, max: 1000000 },
    roomsAmount: { min: 1, max: 10 },
    floor: { min: 1, max: 20 },
    field: { min: 0, max: 1000 }
  });

  // Calculate min/max values after fetching apartments data
  useEffect(() => {
    if (apartments.length > 0) {
      const newRanges = {
        price: {
          min: Math.min(...apartments.map(apt => parseFloat(apt.Price))),
          max: Math.max(...apartments.map(apt => parseFloat(apt.Price)))
        },
        roomsAmount: {
          min: Math.min(...apartments.map(apt => parseInt(apt.RoomsAmount))),
          max: Math.max(...apartments.map(apt => parseInt(apt.RoomsAmount)))
        },
        floor: {
          min: Math.min(...apartments.map(apt => parseInt(apt.Floor))),
          max: Math.max(...apartments.map(apt => parseInt(apt.Floor)))
        },
        field: {
          min: Math.min(...apartments.map(apt => parseFloat(apt.Field))),
          max: Math.max(...apartments.map(apt => parseFloat(apt.Field)))
        }
      };
      setRanges(newRanges);
    }
  }, [apartments]);

  // Handle filtering logic
  const filteredApartments = apartments.filter((apartment: Apartment) => {
    return (
      (filters.price === null || parseFloat(apartment.Price) <= filters.price) &&
      (filters.field === null || parseFloat(apartment.Field) <= filters.field) &&
      (filters.roomsMin === null || parseInt(apartment.RoomsAmount) >= filters.roomsMin) &&
      (filters.roomsMax === null || parseInt(apartment.RoomsAmount) <= filters.roomsMax) &&
      (filters.floorMin === null || parseInt(apartment.Floor) >= filters.floorMin) &&
      (filters.floorMax === null || parseInt(apartment.Floor) <= filters.floorMax)
    );
  });

  const handleFilterChange = (filterName: string, value: number | null) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error.message}</p>;

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

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filter Apartments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <Slider
                min={ranges.price.min}
                max={ranges.price.max}
                value={filters.price}
                label="Max Price"
                onChange={(value) => handleFilterChange('price', value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Field Area</label>
              <Slider
                min={ranges.field.min}
                max={ranges.field.max}
                value={filters.field}
                label="Max Field Area"
                onChange={(value) => handleFilterChange('field', value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rooms Amount</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.roomsMin || ''}
                  onChange={(e) => handleFilterChange('roomsMin', e.target.value ? Number(e.target.value) : null)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.roomsMax || ''}
                  onChange={(e) => handleFilterChange('roomsMax', e.target.value ? Number(e.target.value) : null)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.floorMin || ''}
                  onChange={(e) => handleFilterChange('floorMin', e.target.value ? Number(e.target.value) : null)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.floorMax || ''}
                  onChange={(e) => handleFilterChange('floorMax', e.target.value ? Number(e.target.value) : null)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balcony</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApartments.map((apartment: Apartment) => (
                  <tr key={apartment.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.Building}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.Floor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.Field}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.RoomsAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.Balcony}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apartment.Price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
