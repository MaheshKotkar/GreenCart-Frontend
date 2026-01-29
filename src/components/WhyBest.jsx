import whyBestLady from '../assets/why_best_lady.png';
import deliveryTruckIcon from '../assets/delivery_truck_icon.svg';
import leafIcon from '../assets/leaf_icon.svg';
import coinIcon from '../assets/coin_icon.svg';
import trustIcon from '../assets/trust_icon.svg';

const WhyBest = () => {
    const features = [
        {
            icon: deliveryTruckIcon,
            title: 'Fastest Delivery',
            description: 'Groceries delivered in under 30 minutes.',
        },
        {
            icon: leafIcon,
            title: 'Freshness Guaranteed',
            description: 'Fresh produce straight from the source.',
        },
        {
            icon: coinIcon,
            title: 'Affordable Prices',
            description: 'Quality groceries at unbeatable prices.',
        },
        {
            icon: trustIcon,
            title: 'Trusted by Thousands',
            description: 'Loved by 10,000+ happy customers.',
        },
    ];

    return (
        <section className="bg-white py-12 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Container - Controlled Layout to Prevent Overlap */}
                <div className="bg-light-mint rounded-[40px] overflow-hidden relative flex flex-col lg:flex-row shadow-sm border border-green-50/50">

                    {/* Background Pattern Layer */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/src/assets/main_banner_bg.png')", backgroundSize: '200px' }}></div>

                    {/* Text Section - Top on Mobile, Right on Desktop */}
                    <div className="w-full lg:w-1/2 lg:order-2 relative z-10 flex flex-col justify-center p-8 sm:p-14 lg:p-20 text-center lg:text-left">
                        <div className="max-w-xl mx-auto lg:mx-0 space-y-10 sm:space-y-12">
                            <h2 className="text-[34px] sm:text-[46px] lg:text-[54px] font-black text-[#4FBF8B] leading-[1.1] tracking-tight">
                                Why We Are the Best?
                            </h2>

                            <div className="grid grid-cols-1 gap-8 sm:gap-10">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-center lg:items-start lg:text-left gap-4 sm:gap-8 group text-center sm:text-left">
                                        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#4FBF8B] rounded-[24px] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
                                            <img
                                                src={feature.icon}
                                                alt={feature.title}
                                                className="w-9 h-9 sm:w-11 sm:h-11 brightness-0 invert"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-[22px] sm:text-[25px] font-[900] text-[#2D3A4B] leading-none">
                                                {feature.title}
                                            </h3>
                                            <p className="text-[#6B7280] text-[16px] sm:text-[17px] font-bold leading-relaxed max-w-[360px] opacity-90">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Section - Bottom on Mobile/Tablet, Left on Desktop */}
                    <div className="w-full lg:w-1/2 lg:order-1 relative z-0 flex items-end justify-center lg:justify-start pt-10 sm:pt-0">
                        <div className="relative w-full h-[400px] sm:h-[550px] lg:h-full lg:min-h-[650px] flex justify-center items-end overflow-hidden px-4 md:px-0">
                            <div className="relative w-full h-full flex items-end justify-center lg:justify-start">
                                <img
                                    src={whyBestLady}
                                    alt="Why We Are the Best"
                                    className="w-full sm:w-[85%] lg:w-[130%] h-auto lg:h-[115%] object-contain object-bottom lg:object-left-bottom lg:-translate-x-12 lg:-mb-1 selection:hidden"
                                />
                                {/* Bottom Shadow Blend */}
                                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-light-mint/50 to-transparent lg:hidden pointer-events-none"></div>
                            </div>

                            {/* Desktop only blend gradient */}
                            <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-light-mint to-transparent"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyBest;
