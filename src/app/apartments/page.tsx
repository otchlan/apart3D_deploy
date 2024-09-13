"use client"
import React from 'react';
import useApartments from '@/hooks/useApartments';
import { Apartment } from '@/types/apartment-type';
import View3D from '@/3d/View3D'

const Apartments: React.FC = () => {
  const { apartments, loading, error } = useApartments();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col container mx-auto px-4">
      <div className='my-10 mx-auto'>
        <View3D/>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center my-4">Apartments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
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
            {apartments.map((apartment: Apartment) => (
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
  );
  
};

export default Apartments;