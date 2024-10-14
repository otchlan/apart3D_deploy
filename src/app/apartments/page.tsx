"use client"
import React, { useState, useEffect } from 'react';
import useApartments from '@/hooks/useApartments';
import { Apartment } from '@/types/apartment-type';
import View3D from '@/3d/View3D';
import Slider from '@/components/slider';

const Apartments: React.FC = () => {
  const { apartments, loading, error } = useApartments();

  // Filter state
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      {/*<div className="my-10 mx-auto">
        <View3D />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center my-4">Apartments</h1>
        */}
      {/* Filter UI */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Find Your Perfect Apartment</h1>
        
        {/* Filter UI */}
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
            <div className="w-1/4">
              <Slider
                min={ranges.field.min}
                max={ranges.field.max}
                value={filters.field}
                label="Max Field Area"
                onChange={(value) => handleFilterChange('field', value)}
              />
            </div>
        <div className="w-1/4">
          <label className="block mb-2">Rooms Amount</label>
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
        <div className="w-1/4">
          <label className="block mb-2">Floor</label>
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

      {/* Apartments Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden text-black">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">Building</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Floor</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Field</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Rooms Amount</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Balcony</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredApartments.map((apartment: Apartment) => (
              <tr key={apartment.id} className="even:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{apartment.Building}</td>
                <td className="px-4 py-2 border border-gray-300">{apartment.Floor}</td>
                <td className="px-4 py-2 border border-gray-300">{apartment.Field}</td>
                <td className="px-4 py-2 border border-gray-300">{apartment.RoomsAmount}</td>
                <td className="px-4 py-2 border border-gray-300">{apartment.Balcony}</td>
                <td className="px-4 py-2 border border-gray-300">{apartment.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </main>
    </div>
  );
};

export default Apartments;