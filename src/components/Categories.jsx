import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../assets/assets';

// Import images
import organicVegImg from '../assets/organic_vegitable_image.png';
import freshFruitsImg from '../assets/fresh_fruits_image.png';
import coldDrinksImg from '../assets/bottles_image.png';
import instantFoodImg from '../assets/maggi_image.png';
import dairyProductsImg from '../assets/dairy_product_image.png';
import bakeryBreadsImg from '../assets/bakery_image.png';
import grainsCerealsImg from '../assets/grain_image.png';
import chipsImg from '../assets/Chips.png';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const defaultCategories = [
        {
            name: 'Organic veggies',
            image: organicVegImg,
            path: '/category/organic-veggies',
            bgColor: 'bg-[#FFF8E8]',
            borderColor: 'border-[#F8E7BE]',
        },
        {
            name: 'Fresh Fruits',
            image: freshFruitsImg,
            path: '/category/fresh-fruits',
            bgColor: 'bg-[#FFE8F0]',
            borderColor: 'border-[#FFD1E1]',
        },
        {
            name: 'Cold Drinks',
            image: coldDrinksImg,
            path: '/category/cold-drinks',
            bgColor: 'bg-[#FFFAE8]',
            borderColor: 'border-[#FFF0B3]',
        },
        {
            name: 'Instant Food',
            image: instantFoodImg,
            path: '/category/instant-food',
            bgColor: 'bg-[#E8F9FF]',
            borderColor: 'border-[#B3E5FF]',
        },
        {
            name: 'Dairy Products',
            image: dairyProductsImg,
            path: '/category/dairy-products',
            bgColor: 'bg-[#FFE8D8]',
            borderColor: 'border-[#FFCCAB]',
        },
        {
            name: 'Bakery & Breads',
            image: bakeryBreadsImg,
            path: '/category/bakery-breads',
            bgColor: 'bg-[#E0F4FF]',
            borderColor: 'border-[#B3D9FF]',
        },
        {
            name: 'Grains & Cereals',
            image: grainsCerealsImg,
            path: '/category/grains-cereals',
            bgColor: 'bg-[#F0E8FF]',
            borderColor: 'border-[#D9C4FF]',
        },
        {
            name: 'Chips',
            image: chipsImg,
            path: '/category/chips',
            bgColor: 'bg-[#FFF3E0]',
            borderColor: 'border-[#FFE0B2]',
        },
    ];

    const bgColors = [
        'bg-[#FFF8E8]', 'bg-[#FFE8F0]', 'bg-[#FFFAE8]', 'bg-[#E8F9FF]',
        'bg-[#FFE8D8]', 'bg-[#E0F4FF]', 'bg-[#F0E8FF]', 'bg-[#FFF3E0]'
    ];
    const borderColors = [
        'border-[#F8E7BE]', 'border-[#FFD1E1]', 'border-[#FFF0B3]', 'border-[#B3E5FF]',
        'border-[#FFCCAB]', 'border-[#B3D9FF]', 'border-[#D9C4FF]', 'border-[#FFE0B2]'
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${backendUrl}/category/list`);
                if (res.data && res.data.length > 0) {
                    const formattedCats = res.data.map((cat, index) => ({
                        ...cat,
                        path: `/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`,
                        bgColor: bgColors[index % bgColors.length],
                        borderColor: borderColors[index % borderColors.length]
                    }));
                    setCategories(formattedCats);
                } else {
                    setCategories(defaultCategories);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setCategories(defaultCategories);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section className="py-12 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-[28px] sm:text-[36px] font-black text-dark-text tracking-tight inline-block relative">
                        Categories
                        <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-primary rounded-full"></span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={category.path || '#'}
                            className={`${category.bgColor} border ${category.borderColor} rounded-[24px] p-5 sm:p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 group`}
                        >
                            <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-4 transform group-hover:-rotate-6 transition-transform">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-[13px] sm:text-[14px] font-[900] text-dark-text text-center leading-tight">
                                {category.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
