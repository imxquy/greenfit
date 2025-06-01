import React, { use, useEffect, useState }from 'react'
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length  > 0 ){
            setFilteredProducts(products.filter(products => products.name.toLowerCase().includes(searchQuery.toLowerCase())

            ))}else {
                setFilteredProducts(products);
            }
    }, [products, searchQuery]);

    return (
    <div className="mt-20 px-4 sm:px-6 md:px-10 flex flex-col gap-10">
        {/* Title Section */}
        <div className="flex flex-col items-start">
        <p className="text-3xl font-semibold uppercase text-gray-800 tracking-wide">
            All Products
        </p>
        <div className="w-20 h-1 bg-primary mt-2 rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 xl:gap-8">
        {filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
        </div>
    </div>
    );
}

export default AllProducts
