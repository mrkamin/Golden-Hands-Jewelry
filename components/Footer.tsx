
const Footer = () => {
  return (
    <footer className="bg-[#1f1f38] text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold">Golden Hands Jewelry</p>
        <p className="text-sm mt-2">Handmade with love ✨ | Est. 2025</p>
        <p className="text-xs mt-4 text-gray-400">
        © {new Date().getFullYear()} Golden Hands. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer
