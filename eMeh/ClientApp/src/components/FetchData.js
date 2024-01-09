// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const FetchData = () => {

//   const navigate = useNavigate();

//   const location = useLocation();

//   const { logout } = useAuth();

//   const [forecasts, setForecasts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const renderForecastsTable = (forecasts) => {
//     return (
//       <table className="table table-striped" aria-labelledby="tableLabel">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Temp. (C)</th>
//             <th>Temp. (F)</th>
//             <th>Summary</th>
//           </tr>
//         </thead>
//         <tbody>
//           {forecasts.map(forecast =>
//             <tr key={forecast.date}>
//               <td>{forecast.date}</td>
//               <td>{forecast.temperatureC}</td>
//               <td>{forecast.temperatureF}</td>
//               <td>{forecast.summary}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     );
//   };

//   useEffect(() => {

//     const searchParams = new URLSearchParams(location.search);
//     const categoryParam = searchParams.get('category');

//     if (categoryParam)
//       console.log('Category:', categoryParam);

//   }, [location]);

//   useEffect(() => {

//     const populateWeatherData = async () => {

//       try {

//         const response = await fetch('weatherforecast');

//         if (response.status == 401){

//           logout();
//           navigate("/login");

//         }

//         const data = await response.json(); 

//         setForecasts(data);
//         setLoading(false);

//       } catch (error) {

//         console.error('Error fetching data:', error);

//       }

//     };

//     populateWeatherData();

//   }, []);

//   let contents = loading ? <p><em>Loading...</em></p> : renderForecastsTable(forecasts);

//   return (
//     <div>
//       <h1 id="tableLabel">Weather forecast</h1>
//       <p>This component demonstrates fetching data from the server.</p>
//       {contents}
//     </div>
//   );
// };

// export default FetchData;


import React from 'react';
import ProductsList from './ProductList'

const FetchData = () => {

  const products = [
    {
      name: 'Product 1',
      image: 'https://cdn.weasy.io/users/bestelectronicsv2/catalog/tvwortensamsung.jpg',
      description: 'Description of product 1',
      category: 'Office & SchoolSupplies',
      price: 19.99,
    },
    {
      name: 'Product 2',
      image: 'https://www.heinens.com/wp-content/uploads/2022/08/Babo-Botanicals-600x700-1.jpg',
      description: 'Description of product 2',
      category: 'Health & Wellness',
      price: 24.99, 
    },
    {
      name: 'Ballpoint Pens',
      image: 'https://via.placeholder.com/150',
      description: 'High-quality ballpoint pens perfect for your office & school supplies.',
      category: 'Office & School Supplies',
      price: 9.99,
    },
    {
      name: 'Vitamin C Supplements',
      image: 'https://via.placeholder.com/150',
      description: 'Vitamin C supplements to boost your health & wellness.',
      category: 'Health & Wellness',
      price: 14.99,
    },
    {
      name: 'Organic Quinoa',
      image: 'https://via.placeholder.com/150',
      description: 'High-quality organic quinoa for your food & grocery needs.',
      category: 'Food & Grocery',
      price: 5.49,
    },
    {
      name: 'Hydrating Facial Serum',
      image: 'https://via.placeholder.com/150',
      description: 'Nourishing hydrating facial serum for your beauty & care regimen.',
      category: 'Beauty & Care',
      price: 19.99,
    },
    {
      name: 'Notebook Set',
      image: 'https://via.placeholder.com/150',
      description: 'Elegant notebook set for your office & school supplies.',
      category: 'Office & School Supplies',
      price: 12.49,
    },
    {
      name: 'Yoga Mat',
      image: 'https://via.placeholder.com/150',
      description: 'Comfortable and durable yoga mat for your health & wellness activities.',
      category: 'Health & Wellness',
      price: 24.99,
    },
    {
      name: 'Gourmet Coffee Beans',
      image: 'https://via.placeholder.com/150',
      description: 'Rich and flavorful gourmet coffee beans for your food & grocery delights.',
      category: 'Food & Grocery',
      price: 8.99,
    },
    {
      name: 'Mineral Sunscreen Lotion',
      image: 'https://via.placeholder.com/150',
      description: 'Protective mineral sunscreen lotion for your beauty & care routine.',
      category: 'Beauty & Care',
      price: 16.99,
    },
    {
      name: 'Desk Organizer',
      image: 'https://via.placeholder.com/150',
      description: 'Versatile desk organizer for your office & school supplies.',
      category: 'Office & School Supplies',
      price: 18.49,
    },
    {
      name: 'Resistance Bands Set',
      image: 'https://via.placeholder.com/150',
      description: 'Set of resistance bands for a versatile health & wellness workout.',
      category: 'Health & Wellness',
      price: 29.99,
    },
    {
      name: 'Gluten-Free Pasta',
      image: 'https://via.placeholder.com/150',
      description: 'Delicious gluten-free pasta for your food & grocery choices.',
      category: 'Food & Grocery',
      price: 6.99,
    },
    {
      name: 'Vegan Lip Balm Set',
      image: 'https://via.placeholder.com/150',
      description: 'Moisturizing vegan lip balm set for your beauty & care needs.',
      category: 'Beauty & Care',
      price: 11.99,
    },
    {
      name: 'Sticky Notes',
      image: 'https://via.placeholder.com/150',
      description: 'Colorful sticky notes for organizing your office & school supplies.',
      category: 'Office & School Supplies',
      price: 7.49,
    },
    {
      name: 'Aromatherapy Diffuser',
      image: 'https://via.placeholder.com/150',
      description: 'Relaxing aromatherapy diffuser for your health & wellness relaxation.',
      category: 'Health & Wellness',
      price: 34.99,
    },
    {
      name: 'Artisanal Chocolate Bars',
      image: 'https://via.placeholder.com/150',
      description: 'Exquisite artisanal chocolate bars for your food & grocery indulgence.',
      category: 'Food & Grocery',
      price: 9.49,
    },
    {
      name: 'Natural Hair Conditioner',
      image: 'https://via.placeholder.com/150',
      description: 'Nourishing natural hair conditioner for your beauty & care routine.',
      category: 'Beauty & Care',
      price: 12.99,
    },
    {
      name: 'Highlighter Markers',
      image: 'https://via.placeholder.com/150',
      description: 'Vibrant highlighter markers for highlighting in your office & school supplies.',
      category: 'Office & School Supplies',
      price: 6.99,
    },
    {
      name: 'Fitness Tracker',
      image: 'https://via.placeholder.com/150',
      description: 'Advanced fitness tracker for monitoring your health & wellness activities.',
      category: 'Health & Wellness',
      price: 49.99,
    },
    {
      name: 'Coconut Milk',
      image: 'https://via.placeholder.com/150',
      description: 'Creamy and delicious coconut milk for your food & grocery recipes.',
      category: 'Food & Grocery',
      price: 3.99,
    },
    {
      name: 'Essential Oils Kit',
      image: 'https://via.placeholder.com/150',
      description: 'Aromatic essential oils kit for your beauty & care aromatherapy.',
      category: 'Beauty & Care',
      price: 21.99,
    },
  ];
  

  return (
    <div>
      <h1>Welcome to Our Shop</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default FetchData;
