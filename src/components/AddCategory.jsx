import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(false);
    const [loading, setLoading] = useState(false);

    // We can use the same backend URL pattern
    const backendUrl = 'http://192.168.1.101:5000/api';

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            return toast.error('Please upload a category image');
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);

            const res = await axios.post(`${backendUrl}/category/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                toast.success('Category Added Successfully!');
                setName('');
                setImage(false);
                setImagePreview(false);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to add category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-dark-text">Add New Category</h2>
                <p className="text-gray-500 font-medium">Create a new category for your products.</p>
            </div>

            <form onSubmit={onSubmit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8">
                {/* Image Section */}
                <div className="space-y-4">
                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Category Image</label>
                    <div className="flex items-center gap-6">
                        <label className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group overflow-hidden relative">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="bg-gray-50 p-3 rounded-full mb-2 group-hover:bg-primary/10 transition">
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-primary transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                    </div>
                                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider group-hover:text-primary transition">Upload</span>
                                </>
                            )}
                            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                        </label>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Choose a high-quality icon or image. This will be displayed on the home page category card.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Name Section */}
                <div className="space-y-4">
                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Fresh Fruits, Organic Veggies"
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-dark-text placeholder:text-gray-300"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full sm:w-auto px-12 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-[13px] flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {loading ? 'Adding...' : 'Create Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
