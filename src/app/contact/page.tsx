"use client"

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Button from '@/components/button';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-8">We're here to answer any questions you may have about our apartments.</p>
        </section>

        {/* Contact Form and Info Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form */}
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
              <form className="space-y-6 text-black" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"></textarea>
                </div>
                <div>
                  <Button onClick={() => console.log('Form submitted')}>Send Message</Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-purple-600 mr-4" />
                  <span className="text-gray-600">info@yourapartments.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-purple-600 mr-4" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-purple-600 mr-4" />
                  <span className="text-gray-600">123 Apartment St, Cityville, ST 12345</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Our Location</h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg">
            {/* Replace this div with an actual map component */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map placeholder - Replace with actual map component
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-xl mb-8">Schedule a viewing of our apartments today.</p>
            <Button variant="secondary" size="large">Book a Tour</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;