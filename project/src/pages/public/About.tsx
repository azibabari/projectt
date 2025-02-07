import React from 'react';
import { Leaf, Users, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Azfa Eats</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're revolutionizing the rice industry through technology and sustainable practices,
          connecting farmers directly with consumers while ensuring premium quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide premium quality rice while supporting local farmers and promoting
            sustainable agriculture through innovative technology and fair trade practices.
          </p>
          <div className="space-y-4">
            {[
              { icon: Leaf, text: 'Promoting sustainable farming practices' },
              { icon: Users, text: 'Supporting local farming communities' },
              { icon: Globe, text: 'Ensuring food security' },
              { icon: Award, text: 'Maintaining premium quality standards' },
            ].map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex items-center">
                <Icon className="h-5 w-5 text-primary mr-3" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Rice field"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality',
              description: 'We never compromise on the quality of our products.',
            },
            {
              title: 'Sustainability',
              description: 'Environmental responsibility is at the heart of our operations.',
            },
            {
              title: 'Innovation',
              description: 'Leveraging technology to improve every aspect of our service.',
            },
          ].map((value, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;