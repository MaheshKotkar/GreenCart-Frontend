import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Vegetables',
        price: '',
        oldPrice: '',
        image: ''
    });
    const [categories, setCategories] = useState([]);
    const backendUrl = 'http://192.168.1.101:5000/api';

    const [image, setImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(false);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${backendUrl}/category/list`);
            if (res.data && res.data.length > 0) {
                setCategories(res.data);
                setFormData(prev => ({ ...prev, category: res.data[0].name }));
            } else {
                // Fallback to defaults if none in DB
                setCategories([
                    { name: 'Vegetables' }, { name: 'Fruits' }, { name: 'Dairy' },
                    { name: 'Drinks' }, { name: 'Grains' }, { name: 'Bakery' },
                    { name: 'Instant' }, { name: 'Chips' }
                ]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', Number(formData.price));
            formDataToSend.append('category', formData.category);
            formDataToSend.append('oldPrice', Number(formData.oldPrice));

            if (image) {
                formDataToSend.append('image', image);
            }

            const res = await axios.post(`${backendUrl}/product/add`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Product Added Successfully!');
                setFormData({
                    name: '',
                    description: '',
                    category: categories.length > 0 ? categories[0].name : 'Vegetables',
                    price: '',
                    oldPrice: '',
                    image: ''
                });
                setImage(false);
                setImagePreview(false);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Product Image Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Product Image</h3>
                <div className="flex flex-wrap gap-4">
                    <label className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-light-mint transition-all group overflow-hidden relative">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div className="bg-gray-50 p-2 rounded-full mb-2 group-hover:bg-primary/10 transition">
                                    <svg className="w-8 h-8 text-gray-400 group-hover:text-primary transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold text-gray-500 group-hover:text-primary transition">Upload</span>
                            </>
                        )}
                        <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="grid grid-cols-1 gap-6 max-w-xl">
                <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        placeholder="Type here"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition text-gray-600"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-gray-700">Product Description</label>
                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        required
                        placeholder="Type here"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition resize-none text-gray-600"
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="text-[16px] font-semibold text-gray-700">Category</label>
                    <div className="relative">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition bg-white appearance-none cursor-pointer text-gray-600 font-medium"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[16px] font-semibold text-gray-700">Product Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={onChange}
                            required
                            placeholder="0"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition text-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[16px] font-semibold text-gray-700">Offer Price (Optional)</label>
                        <input
                            type="number"
                            name="oldPrice"
                            value={formData.oldPrice}
                            onChange={onChange}
                            placeholder="0"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition text-gray-600"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button type="submit" className="bg-[#4FBF8B] text-white font-bold px-10 py-2.5 rounded-md shadow-sm hover:bg-[#3ea978] transition-all">
                        ADD
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddProduct;
