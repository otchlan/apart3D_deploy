"use client"
import { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { Apartment } from '@/types/apartment-type';

// Ensure these environment variables are set
const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY!;
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;

const base = new Airtable({ apiKey }).base(baseId);

const useApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  console.log(process.env.NEXT_PUBLIC_AIRTABLE_API_KEY)
  console.log(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records: Apartment[] = [];
        await base('ApartmentsBase')
          .select()
          .eachPage((pageRecords, fetchNextPage) => {
            pageRecords.forEach((record) => {
              records.push({
                id: record.id,
                Building: record.fields['Building'] as string,
                Floor: record.fields['Floor'] as string,
                Field: record.fields['Field'] as string,
                RoomsAmount: record.fields['RoomsAmount'] as string,
                Balcony: record.fields['Balcony'] as string,
                Price: record.fields['Price'] as string,
              });
            });
            fetchNextPage();
          });

        setApartments(records);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { apartments, loading, error };
};

export default useApartments;