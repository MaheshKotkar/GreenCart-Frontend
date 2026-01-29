import mainBannerBg from '../assets/main_banner_bg.png';
import mainBannerBgSm from '../assets/main_banner_bg_sm.png';

const HeroSection = () => {
    return (
        <section className="bg-white py-4 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Container with Responsive Background */}
                <div className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[400px] lg:min-h-[450px] flex items-center">
                    {/* Desktop Background */}
                    <div
                        className="hidden md:block absolute inset-0 bg-cover bg-right lg:bg-center no-repeat"
                        style={{ backgroundImage: `url(${mainBannerBg})` }}
                    ></div>

                    {/* Mobile Background */}
                    <div
                        className="md:hidden absolute inset-0 bg-cover bg-center no-repeat"
                        style={{ backgroundImage: `url(${mainBannerBgSm})` }}
                    ></div>

                    {/* Content Overlay */}
                    <div className="relative z-10 w-full p-8 md:p-12 lg:p-16 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300">
                        <div className="max-w-md lg:max-w-lg space-y-6 md:space-y-8 mt-48 md:mt-0">
                            <h1 className="text-[32px] md:text-4xl lg:text-5xl font-extrabold text-dark-text leading-[1.1] tracking-tight">
                                Freshness You Can Trust, Savings You will Love!
                            </h1>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <button className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group">
                                    Shop now
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                                <a
                                    href="#explore-deals"
                                    className="flex items-center gap-2 text-dark-text font-bold hover:text-primary transition-colors text-lg"
                                >
                                    Explore deals
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
