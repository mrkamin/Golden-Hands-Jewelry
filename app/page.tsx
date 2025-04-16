'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/data';

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filterdProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filterdProducts.length/PRODUCTS_PER_PAGE);

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const currentProducts = filterdProducts.slice(start, end);

  const visiblePages = 5;
  const getVisiblePageNumbers = () => {
    let start = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let end = start + visiblePages - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end -visiblePages + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  

  return (
    <main className="min-h-screen px-6 py-10 bg-white text-gray-800">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-600 mb-4">
          Welcome to Golden Hands Jewelry ✨
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover elegant, handmade jewelry crafted with passion and precision. Each piece tells a story—yours.
        </p>
        <Link href="/shop">
          <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md">
            Shop Now
          </button>
        </Link>
        <div className='mt-6 max-w-md mx-auto'>
          <input 
            type="text"
            placeholder='Search for jewelry...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' 
          />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-64"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-700">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <p className="text-yellow-800 font-bold mt-2">{product.price}</p>
              <Link href={`/product/${product.id}`}>
                <button className="mt-3 text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
      <div className='mt-12 flex justify-center space-x-2'>
        {currentPage > 1 && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800"
            onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}
          >
            «
          </button>
        )}
        {getVisiblePageNumbers().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded 
              transition-all duration-500 ease-in-out 
              ${ page === currentPage 
              ? 'bg-yellow-600 text-white' 
              : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className='px-3 py-1 rounded bg-gray-200 text-gray-800'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
             »
          </button>
        )}
      </div>
    </main>
  );
}