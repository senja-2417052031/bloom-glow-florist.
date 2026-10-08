import React from 'react';

interface FloristLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FloristLogo: React.FC<FloristLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F4F7F3] via-[#FAF8F5] to-[#EAEFE8] border border-[#ADC0AA]/70 shadow-xs group-hover:border-[#6B8767] group-hover:shadow-sm transition-all shrink-0 ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[74%] h-[74%] transform group-hover:scale-105 transition-transform duration-300"
      >
        {/* Outer stylized rose petals in deep sage green */}
        <path
          d="M20 6.5C14.2 6.5 9.8 11.5 10.8 18C11.6 23 15.5 27.2 20 29.5"
          stroke="#445841"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 6.5C25.8 6.5 30.2 11.5 29.2 18C28.4 23 24.5 27.2 20 29.5"
          stroke="#445841"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner blooming bud with soft gold tone */}
        <path
          d="M15.5 16C15.5 12.8 17.5 11 20 11C22.5 11 24.5 12.8 24.5 16C24.5 20.2 21.2 23 20 24C18.8 23 15.5 20.2 15.5 16Z"
          fill="#D4AF37"
          fillOpacity="0.22"
          stroke="#B58D3D"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Delicate center swirl in warm gold */}
        <path
          d="M18.2 15.2C18.2 14.2 19 13.4 20 13.4C21 13.4 21.8 14.2 21.8 15.2C21.8 16.6 20.2 17.6 20 17.8"
          stroke="#8A6B29"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Botanical stem in sage */}
        <path
          d="M20 29.5V35.5"
          stroke="#445841"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Left leaf with soft sage fill */}
        <path
          d="M20 31.5C16 31.5 13.8 29.5 14.5 26.8C16.8 26.8 19 28.8 20 31.5Z"
          fill="#6B8767"
          fillOpacity="0.3"
          stroke="#445841"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* Right leaf with soft sage fill */}
        <path
          d="M20 33C24 33 26.2 31 25.5 28.3C23.2 28.3 21 30.3 20 33Z"
          fill="#6B8767"
          fillOpacity="0.3"
          stroke="#445841"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
