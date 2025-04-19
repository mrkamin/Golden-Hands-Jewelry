// app/checkout/page.tsx
"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, totalItems, totalAmount, clearCart } = useCart();

  const handleSubmit = () => {
    alert("Thank you for your order! (Mock checkout)");
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-700">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold text-yellow-800">{item.name}</h2>
                <p>{item.quantity} × {item.price}</p>
              </div>
              <p>
  $
  {(
    parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) * item.quantity
  ).toFixed(2)}
</p>

            </div>
          ))}

          <div className="mt-4 font-bold text-lg text-gray-800">
            Total ({totalItems} items): ${totalAmount.toFixed(2)}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded"
          >
            Confirm Order
          </button>
        </div>
      )}
      <div className="mt-6">
        <Link href="/cart" className="text-yellow-700 hover:underline">
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
}
