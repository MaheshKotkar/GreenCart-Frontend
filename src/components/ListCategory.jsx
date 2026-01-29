import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const backendUrl = 'http://192.168.1.101:5000/api';

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${backendUrl}/category/list`);
            setCategories(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch categories');
            setLoading(false);
        }
    };

    const seedCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendUrl}/category/seed`);
            if (res.data.success) {
                toast.success('Default Categories Restored!');
                fetchCategories();
            }
        } catch (err) {
            console.error(err);
            toast.error('Seeding failed');
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category? All products in this category might be affected.')) return;

        try {
            const res = await axios.delete(`${backendUrl}/category/delete/${id}`);
            if (res.data.success) {
                toast.success('Category Deleted');
                setCategories(categories.filter(c => c._id !== id));
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete category');
        }
    };

    useEffect(() => {
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
        <div className="space-y-6 max-w-4xl pb-10">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-black text-dark-text tracking-tight">Manage Categories</h2>
                    <p className="text-gray-500 font-medium">View and manage your product categories.</p>
                </div>
                {categories.length === 0 && (
                    <button
                        onClick={seedCategories}
                        className="px-6 py-3 bg-primary/10 text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest text-[11px] flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Restore Defaults
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="relative mb-6">
                                <div className="w-full aspect-square bg-gray-50 rounded-[2rem] flex items-center justify-center p-6 border border-gray-100 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <button
                                    onClick={() => deleteCategory(category._id)}
                                    className="absolute -top-2 -right-2 w-10 h-10 bg-white text-red-500 rounded-full shadow-lg border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all duration-300"
                                    title="Delete Category"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <h3 className="text-lg font-black text-dark-text text-center group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <div className="mt-2 flex justify-center">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                                    Cat ID: #{category._id.slice(-4)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-bold mb-6">No categories found in the database.</p>
                        <button
                            onClick={() => window.location.hash = '#/admin/add-category'} // Just a hint for the user
                            className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
                        >
                            Create your first category
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListCategory;
