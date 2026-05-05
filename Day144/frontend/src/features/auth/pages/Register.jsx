import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {useAuth} from "../hook/useAuth.js"
const Register = () => {
    const navigate = useNavigate();
    const {handleRegister}=useAuth()
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister({
                email: formData.email,
                contact: formData.contactNumber,
                password: formData.password,
                isSeller: formData.isSeller,
                fullname: formData.fullName
            });
            navigate("/");
        } catch (error) {
            console.error("Registration Error:", error);
        }
    };

    const inputStyle = {
        color: '#1b1c1a',
        borderBottom: '1px solid #d0c5b5',
        fontFamily: "'Inter', sans-serif"
    };

    const handleFocus = (e) => { e.target.style.borderBottomColor = '#C9A96E'; };
    const handleBlur = (e) => { e.target.style.borderBottomColor = '#d0c5b5'; };

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >
                {/* ── LEFT: Editorial Image Panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: '#f5f3f0' }}>
                    <img
                        src="/snitch_editorial.png"
                        alt="Snitch Fashion Editorial"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ filter: 'brightness(0.97)' }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)' }}
                    />
                    <div className="absolute inset-0 p-14 flex flex-col justify-between z-10">
                        <span
                            className="text-sm font-medium tracking-[0.35em] uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                        >
                            Snitch.
                        </span>
                        <div>
                            <p
                                className="text-5xl xl:text-6xl font-light leading-[1.08] text-white mb-5"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Define your<br />
                                <em>aesthetic.</em>
                            </p>
                            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                                Join the exclusive movement of creators and brands redefining the modern fashion landscape.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Form Panel ── */}
                <div
                    className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16 overflow-y-auto"
                    style={{ backgroundColor: '#fbf9f6' }}
                >
                    <div className="w-full max-w-sm">

                        {/* Mobile brand mark */}
                        <div className="lg:hidden mb-14">
                            <span
                                className="text-sm tracking-[0.35em] uppercase"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                            >
                                Snitch.
                            </span>
                        </div>

                        {/* Header */}
                        <div className="mb-12">
                            <p
                                className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
                                style={{ color: '#C9A96E' }}
                            >
                                Welcome to Snitch
                            </p>
                            <h1
                                className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                            >
                                Elevate Your Style
                            </h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-9">

                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="reg-fullName"
                                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                    style={{ color: '#7A6E63' }}
                                >
                                    Full Name
                                </label>
                                <input
                                    id="reg-fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="reg-contact"
                                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                    style={{ color: '#7A6E63' }}
                                >
                                    Contact Number
                                </label>
                                <input
                                    id="reg-contact"
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="reg-email"
                                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                    style={{ color: '#7A6E63' }}
                                >
                                    Email Address
                                </label>
                                <input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="reg-password"
                                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                    style={{ color: '#7A6E63' }}
                                >
                                    Password
                                </label>
                                <input
                                    id="reg-password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Register as Seller — minimal checkbox */}
                            <label
                                htmlFor="reg-isSeller"
                                className="flex items-center gap-4 cursor-pointer group"
                            >
                                <div className="relative flex-shrink-0">
                                    <input
                                        id="reg-isSeller"
                                        type="checkbox"
                                        name="isSeller"
                                        checked={formData.isSeller}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    {/* Custom checkbox */}
                                    <div
                                        className="w-4 h-4 border transition-all duration-200 flex items-center justify-center peer-checked:border-[#C9A96E]"
                                        style={{
                                            borderColor: formData.isSeller ? '#C9A96E' : '#d0c5b5',
                                            backgroundColor: formData.isSeller ? '#C9A96E' : 'transparent'
                                        }}
                                    >
                                        {formData.isSeller && (
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="#fbf9f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className="text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
                                    style={{ color: formData.isSeller ? '#C9A96E' : '#7A6E63' }}
                                >
                                    Register as Seller
                                </span>
                            </label>

                            {/* Continue with Google Button */}
                            <a
                                href="/api/auth/google"
                                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                style={{ border: '1px solid #d0c5b5', color: '#1b1c1a', fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d0c5b5'; e.currentTarget.style.color = '#1b1c1a'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                                Continue with Google
                            </a>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-2"
                                style={{ backgroundColor: '#1b1c1a', color: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#C9A96E';
                                    e.currentTarget.style.color = '#1b1c1a';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#1b1c1a';
                                    e.currentTarget.style.color = '#fbf9f6';
                                }}
                            >
                                Sign Up
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px" style={{ backgroundColor: '#e4e2df' }} />
                                <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: '#B5ADA3' }}>or</span>
                                <div className="flex-1 h-px" style={{ backgroundColor: '#e4e2df' }} />
                            </div>


                            {/* Footer Link */}
                            <p className="text-center text-[11px]" style={{ color: '#B5ADA3' }}>
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="transition-colors duration-200"
                                    style={{ color: '#7A6E63', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                                    onMouseEnter={e => e.target.style.color = '#C9A96E'}
                                    onMouseLeave={e => e.target.style.color = '#7A6E63'}
                                >
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;