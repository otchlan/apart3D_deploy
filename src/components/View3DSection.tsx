import React from 'react';
import View3D from '@/components/View3D';

const View3DSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Wirtualna Wizyta 3D</h2>
      <div className="bg-white mx-auto" style={{ width: '1240px', height: '640px' }}>
        <View3D />
      </div>
      <p className="text-center text-gray-600 mt-4">Interaktywnie przeglądaj nasz model budynku, aby poznać jego układ.</p>
    </section>
  );
}

export default View3DSection;
