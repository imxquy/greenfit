import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {

    const {navigate} = useAppContext();

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium mb-4'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6'>

        {categories.map((category, index)=> (

        <div
        key={index}
        className='group cursor-pointer p-4 rounded-xl flex flex-col items-center justify-center text-center hover:shadow-md transition'
        style={{ backgroundColor: category.bgColor }}
        onClick={() => {
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0, 0);
        }}
        >
        <img
            src={category.image}
            alt={category.text}
            className='w-20 h-20 object-contain mb-3 group-hover:scale-105 transition duration-200'
        />
        <p className='text-sm font-semibold'>{category.text}</p>
        </div>
    
        ))}

      </div>
    </div>
  )
}

export default Categories
