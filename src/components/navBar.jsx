import React from "react";
import { Search } from "lucide-react";

const NavBar = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto max-w-screen-lg flex flex-col md:flex-row md:items-center md:justify-between">
        
      
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold text-gray-800">د/ أحمد إبراهيم</p>
          <img
            src="https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Qe42djhSzpBGLUN5CKkTp~Kj7VYDQH3aejw6Wwt5sa3tbTLJUMSxHmpclSIxtfDi0nTn5bQ76pFFaK1fl0vGZOghNVqLOaPcu7x4zGchM-ky2ux8xNegT9v4whNiX6YFyVap~CJO5eFdo2iTprzJb~vB4Mp3i9bBT0GqxySJhu6uNjRd921IG6KXuVfXTsMvb~R7Ilmrx50DacQ4xsa9MXb4coT7wLk2mNf6XhBdmjWcioqi1RlVdtcJGEsAQeqhtArElIsARpCHgwGPQ07r6g7xPpiQ0uncFLOYKUetinSODGGmI97ikNivGESK4Xrp2Iy-dpJQRNNx75fja2DhRw__"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
        </div>

        
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="ابحث هنا"
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>

        
        <div className="mt-4 md:mt-0">
          <p className="text-gray-700">مرحباً بك في شركة <span className="font-bold text-blue-600">SP</span></p>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
