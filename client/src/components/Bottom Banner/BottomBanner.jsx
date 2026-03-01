import React from 'react'
import { assets, features } from '../../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Responsive Image */}
      <picture>
        <source srcSet={assets.bottom_banner_image_sm} media="(max-width: 767px)" />
        <source srcSet={assets.bottom_banner_image} media="(min-width: 768px)" />
        <source srcSet={assets.bottom_banner_image} media="(min-width: 1025px)" />
        <img
          src={assets.bottom_banner_image}
          alt="Promotional banner"
          className="w-full"
        />
      </picture>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col 
                      items-center justify-start pt-10
                      sm:pt-14
                      md:justify-end md:pt-8 md:px-8 md:items-end
                      lg:items-end lg:justify-center lg:pt-0 lg:pr-24">
        <div className="max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-lg">
          <h1 className="text-lg sm:text-2xl md:text-xl lg:text-4xl 
                         font-outfit font-semibold text-primary mb-4 sm:mb-6">
            Why We Are The Best?
          </h1>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 md:gap-3 mt-2 sm:mt-3 md:mt-0 lg:mt-7"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-7 sm:w-9 md:w-8 lg:w-11 shrink-0"
              />
              <div className="space-y-0.5 sm:space-y-1 md:space-y-1">
                <h3 className="text-sm sm:text-lg md:text-sm font-semibold ">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500/80 leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BottomBanner