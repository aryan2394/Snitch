import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../../cart/hook/useCart';
const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const navigate = useNavigate();
    const { handleAddItem } = useCart();
    const { handleGetProductById } = useProduct();





    async function fetchProductDetails() {
        try {
            const data = await handleGetProductById(productId);
            // Handle both cases depending on how API is structured
            setProduct(data?.product || data);
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (product?.variants?.length > 0) {
            setSelectedAttributes(product.variants[0].attributes || {});
        }
    }, [product]);

    const activeVariant = useMemo(() => {
        if (!product?.variants || product.variants.length === 0) return null;
        return product.variants.find(v => {
            if (!v.attributes) return false;
            const vKeys = Object.keys(v.attributes);
            const sKeys = Object.keys(selectedAttributes);
            const isMatch = vKeys.every(k => v.attributes[k] === selectedAttributes[k]);
            // If they don't have exactly the same keys, they shouldn't perfectly match, 
            // but we might only care about matching what's available.
            return vKeys.length === sKeys.length && isMatch;
        });
    }, [product, selectedAttributes]);


    console.log({ product, activeVariant })

    const availableAttributes = useMemo(() => {
        if (!product?.variants) return {};
        const attrs = {};
        product.variants.forEach(variant => {
            if (variant.attributes) {
                Object.entries(variant.attributes).forEach(([key, value]) => {
                    if (!attrs[key]) attrs[key] = new Set();
                    attrs[key].add(value);
                });
            }
        });
        Object.keys(attrs).forEach(key => {
            attrs[key] = Array.from(attrs[key]);
        });
        return attrs;
    }, [product]);

    useEffect(() => {
        setSelectedImage(0);
    }, [activeVariant]);

    const handleAttributeChange = (attrName, value) => {
        const newAttrs = { ...selectedAttributes, [attrName]: value };

        // Find if an exact match exists for this combination
        const exactMatch = product.variants.find(v => {
            const vAttrs = v.attributes || {};
            return Object.keys(newAttrs).every(k => newAttrs[k] === vAttrs[k]) &&
                Object.keys(vAttrs).every(k => newAttrs[k] === vAttrs[k]);
        });

        if (exactMatch) {
            setSelectedAttributes(exactMatch.attributes);
        } else {
            // Find any variant that has this newly selected attribute to fallback nicely
            const fallbackVariant = product.variants.find(v => v.attributes && v.attributes[attrName] === value);
            if (fallbackVariant) {
                setSelectedAttributes(fallbackVariant.attributes);
            } else {
                setSelectedAttributes(newAttrs);
            }
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center selection:bg-[#C9A96E]/30" style={{ backgroundColor: '#fbf9f6' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#B5ADA3' }} className="text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse">
                    Retrieving piece...
                </p>
            </div>
        );
    }

    console.log(product)

    // Fallbacks
    const displayImages = (activeVariant?.images && activeVariant.images.length > 0)
        ? activeVariant.images
        : (product.images && product.images.length > 0 ? product.images : [{ url: '/snitch_editorial_warm.png' }]);

    const displayPrice = activeVariant?.price?.amount
        ? activeVariant.price
        : product.price;

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#C9A96E]/30 pb-24"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >

                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-12 lg:pt-20">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* ── LEFT: Image Gallery ── */}
                        <div className="w-full lg:w-[55%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6 lg:sticky lg:top-28">

                            {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
                            {displayImages.length > 1 && (
                                <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-20 lg:w-24 flex-shrink-0 lg:max-h-[600px]">
                                    {displayImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`flex-shrink-0 w-16 md:w-full aspect-[4/5] overflow-hidden rounded transition-all duration-300 ${selectedImage === idx ? 'opacity-100 ring-1 ring-[#C9A96E] ring-offset-1' : 'opacity-55 hover:opacity-100'}`}
                                            style={{ backgroundColor: '#f5f3f0', '--tw-ring-offset-color': '#fbf9f6' }}
                                        >
                                            <img src={img.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="relative w-full aspect-[4/5] lg:max-h-[600px] overflow-hidden rounded-md shadow-sm group" style={{ backgroundColor: '#f5f3f0' }}>
                                <img
                                    src={displayImages[selectedImage]?.url || displayImages[0].url}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {displayImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === 0 ? displayImages.length - 1 : prev - 1)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border rounded-full"
                                            style={{ backgroundColor: 'rgba(251,249,246,0.9)', borderColor: '#e4e2df', color: '#1b1c1a' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fbf9f6'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(251,249,246,0.9)'}
                                            aria-label="Previous image"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === displayImages.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border rounded-full"
                                            style={{ backgroundColor: 'rgba(251,249,246,0.9)', borderColor: '#e4e2df', color: '#1b1c1a' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fbf9f6'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(251,249,246,0.9)'}
                                            aria-label="Next image"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT: Product Details ── */}
                        <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:sticky lg:top-28">

                            <h1
                                className="text-3xl md:text-4xl font-light tracking-wide leading-tight mb-4"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                            >
                                {product.title}
                            </h1>

                            <div className="mb-6">
                                <span
                                    className="text-base uppercase tracking-[0.15em] font-medium"
                                    style={{ color: '#C9A96E' }}
                                >
                                    {displayPrice?.currency} {displayPrice?.amount?.toLocaleString()}
                                </span>
                            </div>

                            <div className="h-px w-full mb-6" style={{ backgroundColor: '#e4e2df' }} />

                            {/* Options/Variants */}
                            {Object.entries(availableAttributes).map(([attrName, values]) => (
                                <div key={attrName} className="mb-5">
                                    <h3 className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-2.5" style={{ color: '#7A6E63' }}>
                                        Select {attrName}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {values.map(val => {
                                            const isSelected = selectedAttributes[attrName] === val;
                                            return (
                                                <button
                                                    key={val}
                                                    onClick={() => handleAttributeChange(attrName, val)}
                                                    className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] font-medium transition-all duration-300 border rounded ${isSelected ? 'border-[#1b1c1a] bg-[#1b1c1a] text-[#fbf9f6]' : 'border-[#d0c5b5] text-[#1b1c1a] hover:border-[#1b1c1a] hover:bg-gray-50'}`}
                                                    style={isSelected ? {} : { backgroundColor: 'transparent' }}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* Stock Information */}
                            {activeVariant && activeVariant.stock !== undefined && (
                                <div className="mb-6 flex items-center gap-2">
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${activeVariant.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                                    <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold ${activeVariant.stock > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                        {activeVariant.stock > 0 ? `${activeVariant.stock} Available` : 'Out of Stock'}
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-3.5" style={{ color: '#7A6E63' }}>
                                    The Description
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-600 font-light">
                                    {product.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <button
                                    className="flex-1 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded shadow-sm"
                                    style={{
                                        backgroundColor: '#1b1c1a',
                                        color: '#fbf9f6',
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#C9A96E';
                                        e.currentTarget.style.color = '#1b1c1a';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = '#1b1c1a';
                                        e.currentTarget.style.color = '#fbf9f6';
                                    }}
                                    onClick={async () => {
                                        try {
                                            await handleAddItem({
                                                productId: product._id,
                                                variantId: activeVariant?._id,
                                            });
                                            alert("Item added to cart successfully!");
                                        } catch (error) {
                                            if (error.response?.status === 401) {
                                                alert("Please login to add items to cart");
                                                navigate("/login");
                                            } else {
                                                alert(error.response?.data?.message || "Failed to add item to cart");
                                            }
                                        }
                                    }}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    className="flex-1 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 border rounded"
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: '#d0c5b5',
                                        color: '#1b1c1a',
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#C9A96E';
                                        e.currentTarget.style.backgroundColor = '#fbf9f6';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = '#d0c5b5';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Extra elegant details */}
                            <div className="mt-10 space-y-3.5 text-[10px] uppercase tracking-[0.1em]" style={{ color: '#B5ADA3' }}>
                                <div className="flex justify-between border-b pb-3.5" style={{ borderColor: '#e4e2df' }}>
                                    <span>Shipping</span>
                                    <span className="text-gray-700">Complimentary over INR 15,000</span>
                                </div>
                                <div className="flex justify-between border-b pb-3.5" style={{ borderColor: '#e4e2df' }}>
                                    <span>Returns</span>
                                    <span className="text-gray-700">Within 14 days of delivery</span>
                                </div>
                                <div className="flex justify-between border-b pb-3.5" style={{ borderColor: '#e4e2df' }}>
                                    <span>Authenticity</span>
                                    <span className="text-gray-700">100% Guaranteed</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;