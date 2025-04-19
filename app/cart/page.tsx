"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
    return sum + numericPrice * item.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-700 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={80} height={80} />
                <div>
                  <h2 className="font-semibold text-yellow-800">{item.name}</h2>
                  <p>{item.quantity} × ${item.price}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">
                Remove
              </button>
            </div>
          ))}
         <div className="mt-6 text-lg font-bold text-gray-800">
            Total Items: {totalItems}
          </div>
          <div className="text-lg font-bold text-gray-800">
            Total Price: ${total.toFixed(2)}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button onClick={clearCart} className="px-4 py-2 bg-red-500 w-fit text-white rounded hover:bg-red-600">
              Clear Cart
            </button>
            <Link href="/checkout">
              <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
          <div className="mt-10">
        <Link href="/">
          <button className="text-yellow-700 hover:underline">
            ← Back to Home
          </button>
        </Link>
      </div>
        </>
      )}
    </div>
  );
}
