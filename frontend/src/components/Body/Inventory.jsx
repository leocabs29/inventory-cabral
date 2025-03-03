import React, { useEffect, useState } from "react";
import Nav from "../Header/Nav";
import axios from "axios";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function Inventory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Stores filtered products
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const url = "http://localhost:3000/products";
  const url2 = "http://localhost:3000/categories";

  // Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFilteredData(response.data); // Initialize with all products
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(url2);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Apply search and filter logic
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? item.product_category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <Nav />

        <div className="w-full p-4">
          <div className="overflow-x-auto">
            <div className="w-full p-4 flex space-x-4 justify-center items-center">
              
              {/* Search Input */}
              <label className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 p-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                  placeholder="Search"
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Search
                </span>
              </label>

              {/* Add Button */}
              <a
                className="inline-block rounded-sm border h-max border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                href="#"
              >
                Add
              </a>

              {/* Category Filter */}
              <Select
                color="primary"
                placeholder="Show all"
                size="md"
                variant="outlined"
                onChange={(event, newValue) => setSelectedCategory(newValue)}
              >
                <Option value="">Show all</Option>
                {categories.map((category) => (
                  <Option key={category.id} value={category.category_name}>
                    {category.category_name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Products Table */}
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Category</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Stock</th>
                  <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Price</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {displayedItems.length > 0 ? (
                  displayedItems.map((item) => (
                    <tr key={item.product_id}>
                      <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">{item.product_name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.product_category}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.product_stock}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.product_price}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <a
                          href="#"
                          className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                      Nothing found here
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Prev
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`block size-8 rounded-sm border ${
                        currentPage === index + 1
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-100 bg-white text-gray-900"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ol>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
