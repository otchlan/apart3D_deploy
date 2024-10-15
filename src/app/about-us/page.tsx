import React from 'react';
import Image from 'next/image';
import Button from '@/components/button';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Our Vision</h1>
          <p className="text-xl text-gray-600 mb-8">Creating modern living spaces for the discerning urban dweller.</p>
        </section>

        {/* Our Story Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Our Building"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-600 mb-4">
                  Founded in 2010, our development company has been at the forefront of innovative urban living. We believe in creating spaces that not only meet the needs of modern city dwellers but exceed their expectations in terms of design, functionality, and sustainability.
                </p>
                <p className="text-gray-600 mb-4">
                  Our team of experienced architects, designers, and developers work tirelessly to ensure that every apartment we create is a perfect blend of style and comfort, tailored to the unique lifestyle of our residents.
                </p>
                <Button>Learn More About Our Projects</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-gradient-to-r from-purple-100 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Innovation', description: 'Pushing the boundaries of modern living with smart home technologies and cutting-edge design.' },
                { title: 'Quality', description: 'Using premium materials and employing skilled craftsmen to ensure lasting value in every home.' },
                { title: 'Sustainability', description: 'Incorporating eco-friendly features and energy-efficient systems in all our developments.' }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jane Doe', role: 'Lead Architect', image: '/api/placeholder/300/300' },
              { name: 'John Smith', role: 'Development Manager', image: '/api/placeholder/300/300' },
              { name: 'Emily Brown', role: 'Interior Designer', image: '/api/placeholder/300/300' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Experience Our Vision?</h2>
            <p className="text-xl mb-8">Book a tour of our show apartments and see the difference for yourself.</p>
            <Button variant="secondary" size="large">Schedule a Viewing</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;