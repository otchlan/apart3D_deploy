//src/app/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Button from '@/components/button';
import Carousel from "@/components/carousel";
import SlideInSection from '@/components/SlideInSection';
import SpinningDoorCard from '@/components/SpinningFeatureCardComponent';

// Dynamicznie importowane komponenty
const View3DSmall = dynamic(() => import('@/3d/View3DSmall'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-600">Ładowanie widoku 3D...</div>
    </div>
  )
});

// Import statycznych zasobów
import image1 from '@/assets/example-image-1.jpg';
import image2 from '@/assets/example-image-2.jpg';
import image3 from '@/assets/example-image-3.jpg';
import image4 from '@/assets/example-image-4.jpg';
import image5 from '@/assets/example-image-5.jpg';

export default function StronaGłówna() {
  const obrazy = [
    { src: image1, width: 800, height: 600 },
    { src: image2, width: 800, height: 600 },
    { src: image3, width: 800, height: 600 },
    { src: image4, width: 800, height: 600 },
    { src: image5, width: 800, height: 600 },
  ];

  const funkcje = [
  {
    id: 1,
    title: "Dynamiczne plansze 3D",
    description: "Specjalizujemy się w tworzeniu interaktywnych stron internetowych i wirtualnych wycieczek przy użyciu statyczno-dynamicznych plansz 3D. Nasza technologia pozwala potencjalnym nabywcom na zwiedzanie domów z dowolnego miejsca, zapewniając wciągające doświadczenie, które zwiększa zaangażowanie i zainteresowanie.",
  },
  {
    id: 2,
    title: "Przyspieszona sprzedaż",
    description: "Nasze systemy są zaprojektowane, aby uprościć proces sprzedaży i pomóc szybciej zawierać transakcje. Poprzez integrację zaawansowanej analityki i przyjaznych interfejsów użytkownika, zapewniamy skuteczną prezentację nieruchomości, co prowadzi do szybszej sprzedaży i zadowolonych klientów.",
  },
  {
    id: 3,
    title: "Rozszerzenie zasięgu rynkowego",
    description: "Jesteśmy zaangażowani w ciągłą innowację. Nasze plany na przyszłość obejmują stworzenie kompleksowej platformy, która rozszerzy Twój zasięg w całej Europie, łącząc Cię z szerszą grupą odbiorców i zwiększając potencjał rynkowy. Działania będziemy kierować w stronę wsparcia osób chcących osiedlić się W Polsce",
  },
];
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Sekcja główna z integracją 3D */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4 py-20"
          style={{
            backgroundImage: "url('/main-background.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 rounded-xl p-8 backdrop-blur-sm" style={{ minHeight: '700px' }}>
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Interaktywne Doświadczenie 3D
                </h2>
                <p className="text-xl text-white">
                  Zwiedzaj wirtualnie budynek, sprawdź każdy detal przed zakupem. Nasze interaktywne rozwiązanie 3D pozwala zobaczyć przyszły dom z każdej perspektywy.
                </p>
                <ul className="space-y-3 text-white">
                  {['Przejrzyj wszystkie plany mieszkań', 'Widok z dowolnego kąta', 'Spaceruj między mieszkaniami', 'Sprawdź lokalizację udogodnień'].map((feature, index) => (
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
                  onClick={() => window.location.href = '/apartments'}
                >
                  Wyświetl pełną wycieczkę 3D
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <Suspense fallback={
                    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="text-gray-600">Ładowanie widoku 3D...</div>
                    </div>
                  }>
                    <View3DSmall />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja Funkcji */}
        <section className="bg-gradient-to-br from-purple-300 to-blue-300 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Dlaczego wybrać nas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {funkcje.map((funkcja, index) => (
                <SpinningDoorCard
                  key={funkcja.id}
                  title={funkcja.title}
                  description={funkcja.description}
                  className="h-full overflow-hidden" // Custom className
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja Wezwania do Działania */}
        <SlideInSection className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Gotowy, aby znaleźć swoje wymarzone mieszkanie?</h2>
            <p className="text-xl mb-8">Przejrzyj naszą kolekcję mieszkań i znajdź idealne dla siebie.</p>
            <Button 
              size="large"
              className="mt-8"
              onClick={() => window.location.href = '/apartments'}
            >
              Wyświetl Mieszkania
            </Button>
          </div>
        </SlideInSection>

        {/* Sekcja Polecane Mieszkanie */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Image
                src="/cta-first-page.jpeg"
                alt="Polecane Mieszkanie"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Przekształć marketing nieruchomości dzięki naszym stronom internetowym 3D i platformie marketingowej</h3>
              <p className="text-xl mb-8 text-gray-800">
                Uwolnij potencjał wizualizacji 3D. Zaangażuj kupujących, przyspiesz sprzedaż i rozszerz zasięg dzięki naszym niestandardowym rozwiązaniom stron internetowych 3D.
              </p>
              <ul className="text-left mx-auto mb-8 max-w-lg text-gray-600">
                <li className="mb-2">- Wizualizacja 3D ułatwia klientom wyobrażenie sobie domu, co przyspiesza proces podejmowania decyzji zakupowych. Potencjalni klienci mogą dokładniej ocenić nieruchomości bez osobistej wizyty.</li>
                <li className="mb-2">- Strona internetowa z interaktywnymi wizualizacjami zwiększa liczbę leadów sprzedażowych, ponieważ więcej osób zainteresowanych nowoczesnymi i przejrzystymi rozwiązaniami odwiedza stronę.</li>
                <li className="mb-2">- Interaktywna i angażująca wizualizacja 3D może zatrzymać użytkowników na dłużej, co może poprawić wskaźniki SEO strony. Lepsze zrozumienie produktu może zwiększyć liczbę zapytań i zamknięć sprzedaży.</li>
              </ul>
              <Button
                size="large"
                className="mt-8"
                onClick={() => window.open('https://calendly.com/mstachura-deeptechlabs/30min', '_blank', 'noopener,noreferrer')}
              >
                Skontaktuj się - Umów spotkanie
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}