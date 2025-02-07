import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions? We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div className="ml-4">
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">support@azfaeats.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div className="ml-4">
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+234 (0) 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div className="ml-4">
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">
                  123 Rice Market Street<br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div className="ml-4">
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;