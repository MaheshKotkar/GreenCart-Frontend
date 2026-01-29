import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl } from '../assets/assets';
import { allProducts as defaultProducts } from '../data/allProducts';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        oldPrice: ''
    });
    const [editImage, setEditImage] = useState(false);
    const [editImagePreview, setEditImagePreview] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/product/list`);
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch products');
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${backendUrl}/category/list`);
            if (res.data && res.data.length > 0) {
                setCategories(res.data);
            } else {
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

    const toggleStatus = async (id) => {
        try {
            const res = await axios.post(`${backendUrl}/product/toggle`, { id });
            if (res.data.success) {
                setProducts(products.map(p => p._id === id ? { ...p, isActive: res.data.isActive } : p));
                toast.success(res.data.isActive ? 'Product Enabled' : 'Product Disabled');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status');
        }
    };

    const seedProducts = async () => {
        try {
            await axios.post(`${backendUrl}/product/seed`, defaultProducts);
            toast.success('Default products loaded!');
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error('Failed to seed products');
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name,
            description: product.description || '',
            category: product.category,
            price: product.price,
            oldPrice: product.oldPrice || ''
        });
        setEditImagePreview(product.image);
        setEditImage(false);
        setShowEditModal(true);
    };

    const handleEditChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImage(file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('id', editingProduct._id);
            formDataToSend.append('name', editFormData.name);
            formDataToSend.append('description', editFormData.description);
            formDataToSend.append('price', editFormData.price);
            formDataToSend.append('category', editFormData.category);
            formDataToSend.append('oldPrice', editFormData.oldPrice);
            if (editImage) {
                formDataToSend.append('image', editImage);
            }

            const res = await axios.post(`${backendUrl}/product/update`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Product Updated Successfully!');
                setShowEditModal(false);
                fetchProducts();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to update product');
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-dark-text">All Products List</h2>
                {products.length === 0 && (
                    <button
                        onClick={seedProducts}
                        className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20"
                    >
                        Load Default Products
                    </button>
                )}
            </div>

            {/* Product Table Header */}
            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 bg-gray-50 rounded-2xl text-[13px] font-black text-gray-500 uppercase tracking-wider mb-4 border border-gray-100">
                <span>Image</span>
                <span>Name</span>
                <span>Category</span>
                <span>Price</span>
                <span className="text-center">Edit</span>
                <span className="text-center">Status</span>
            </div>

            {/* Product List */}
            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-4 p-4 md:p-6 bg-white border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${product.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/10 opacity-80'}`}
                    >
                        {/* Image */}
                        <div className="flex justify-center md:block">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
                                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain transform hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>

                        {/* Name */}
                        <div className="text-center md:text-left">
                            <h3 className="text-[16px] font-black text-dark-text leading-tight">{product.name}</h3>
                        </div>

                        {/* Category */}
                        <div className="text-center md:text-left">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[12px] font-bold uppercase tracking-tight">
                                {product.category}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="text-center md:text-left font-black text-primary text-[16px]">
                            ${product.price}
                        </div>

                        {/* Edit Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => openEditModal(product)}
                                className="p-2.5 bg-gray-50 text-gray-500 hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 border border-gray-100"
                                title="Edit Product"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                        </div>

                        {/* Action Toggle */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => toggleStatus(product._id)}
                                className={`relative w-24 h-9 rounded-full transition-all duration-500 flex items-center px-1.5 ${product.isActive ? 'bg-primary' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ${product.isActive ? 'translate-x-15' : 'translate-x-0'}`} />
                                <span className={`w-full text-[10px] font-black uppercase tracking-widest text-white text-center z-10 select-none ${product.isActive ? 'pr-6' : 'pl-6'}`}>
                                    {product.isActive ? 'ON' : 'OFF'}
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-[24px] font-black text-dark-text">Edit Product</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={submitEdit} className="space-y-6">
                            {/* Image Upload */}
                            <div className="flex justify-center mb-8">
                                <label className="relative group cursor-pointer">
                                    <div className="w-32 h-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                                        {editImagePreview ? (
                                            <img src={editImagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                        )}
                                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                    </div>
                                    <input type="file" onChange={handleEditImageChange} className="hidden" accept="image/*" />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleEditChange}
                                        required
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-dark-text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                    <select
                                        name="category"
                                        value={editFormData.category}
                                        onChange={handleEditChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-dark-text"
                                    >
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Current Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editFormData.price}
                                        onChange={handleEditChange}
                                        required
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-[1000] text-[20px] text-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Original Price ($)</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={editFormData.oldPrice}
                                        onChange={handleEditChange}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-gray-400 line-through"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditChange}
                                    rows="3"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-dark-text resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-[13px]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-[13px]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 11v10" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-bold mb-6">No products found in the database.</p>
                </div>
            )}
        </div>
    );
};

export default ListProduct;
