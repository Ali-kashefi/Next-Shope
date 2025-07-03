import React, { useState, useEffect } from 'react';


const sliderImages = [
  'https://m.media-amazon.com/images/S/aplus-media/vc/8f1c7674-2535-4a8b-a03a-c762eba53c85.__CR0,0,970,300_PT0_SX970_V1___.jpg', // تصویر لپ‌تاپ یا محصول دیگر
  'https://www.visions.ca/media/wysiwyg/iphone16-banner.jpg',
  
];

const HeroSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
 
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % sliderImages.length
      );
    }, 3000); 


    return () => clearInterval(interval);
  }, []); 

  return (
    <section className="w-full relative rounded-b-xl overflow-hidden shadow-lg">
      <div
        className="hero-image-actual w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[450px] 
                   bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url('${sliderImages[currentSlideIndex]}')` }}
      ></div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
       
        {sliderImages.map((_, index) => (
          <span
            key={index} 
            className={`block w-3 h-3 rounded-full cursor-pointer transition-colors duration-300
              ${index === currentSlideIndex ? 'bg-[var(--color-secondary-0)] opacity-75' : 'bg-[var(--color-secondary-300)]'}`
            }
            onClick={() => setCurrentSlideIndex(index)} 
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;