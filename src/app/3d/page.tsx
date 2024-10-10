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
    <div className="flex flex-col container mx-auto px-4">
    <div className="my-10 mx-auto">
        <View3D />
      </div>


      
      </div>

  );
};

export default Apartments;