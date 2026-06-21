import React from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const ChooseRole = () => {
    const { handleUpdateRole } = useAuth();
    const navigate = useNavigate();

    const selectRole = async (role) => {
        try {
            await handleUpdateRole({ role });
            if (role === "seller") {
                navigate("/seller/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Failed to select role:", error);
        }
    };

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen flex flex-col items-center justify-center px-6 py-12 selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >
                {/* Brand Header */}
                <div className="text-center mb-16">
                    <span
                        className="text-xs font-semibold tracking-[0.4em] uppercase block mb-4"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#C9A96E' }}
                    >
                        Snitch.
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl font-light leading-tight text-[#1b1c1a]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Define Your <em>Identity</em>
                    </h1>
                    <p className="text-sm font-light text-[#7A6E63] mt-4 max-w-sm mx-auto leading-relaxed">
                        To tailor your Snitch experience, please select how you wish to navigate our digital ecosystem.
                    </p>
                </div>

                {/* Selection Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
                    
                    {/* Buyer Selection Card */}
                    <div
                        onClick={() => selectRole("buyer")}
                        className="border transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#1b1c1a]"
                        style={{ borderColor: '#d0c5b5', backgroundColor: '#fbf9f6' }}
                    >
                        <div>
                            <span
                                className="text-[10px] uppercase tracking-[0.2em] font-semibold block mb-6 transition-colors duration-300 group-hover:text-[#C9A96E]"
                                style={{ color: '#7A6E63' }}
                            >
                                01 / Navigation
                            </span>
                            <h2
                                className="text-3xl font-light text-[#1b1c1a] mb-4 transition-colors duration-300 group-hover:text-white"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Continue as <em>Buyer</em>
                            </h2>
                            <p className="text-sm font-light text-[#7A6E63] leading-relaxed mb-8 transition-colors duration-300 group-hover:text-gray-400">
                                Explore exclusive drops, curated editorial collections, and discover pieces that define your aesthetic.
                            </p>
                        </div>
                        <div
                            className="mt-auto py-3 text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300"
                            style={{ border: '1px solid #1b1c1a', color: '#1b1c1a', backgroundColor: 'transparent' }}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#1b1c1a';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#1b1c1a';
                            }}
                        >
                            Enter Storefront
                        </div>
                    </div>

                    {/* Seller Selection Card */}
                    <div
                        onClick={() => selectRole("seller")}
                        className="border transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#1b1c1a]"
                        style={{ borderColor: '#d0c5b5', backgroundColor: '#fbf9f6' }}
                    >
                        <div>
                            <span
                                className="text-[10px] uppercase tracking-[0.2em] font-semibold block mb-6 transition-colors duration-300 group-hover:text-[#C9A96E]"
                                style={{ color: '#7A6E63' }}
                            >
                                02 / Business
                            </span>
                            <h2
                                className="text-3xl font-light text-[#1b1c1a] mb-4 transition-colors duration-300 group-hover:text-white"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Continue as <em>Seller</em>
                            </h2>
                            <p className="text-sm font-light text-[#7A6E63] leading-relaxed mb-8 transition-colors duration-300 group-hover:text-gray-400">
                                Establish your label, launch digital boutique catalogs, and reach a curated network of modern creators.
                            </p>
                        </div>
                        <div
                            className="mt-auto py-3 text-center text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300"
                            style={{ border: '1px solid #1b1c1a', color: '#1b1c1a', backgroundColor: 'transparent' }}
                            onMouseEnter={e => {
                                e.target.style.backgroundColor = '#1b1c1a';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#1b1c1a';
                            }}
                        >
                            Establish Boutique
                        </div>
                    </div>

                </div>

                {/* Footer brand markup */}
                <p className="text-center text-[10px] tracking-[0.15em] text-[#B5ADA3] mt-24 uppercase">
                    &copy; 2026 Snitch Archive. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default ChooseRole;
