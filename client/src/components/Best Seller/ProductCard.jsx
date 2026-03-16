import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/useAppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItem, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}
        className="
          border border-gray-500/20 rounded-md
          px-3 md:px-4 py-2 bg-white
          w-full sm:max-w-56
        "
      >
        {/* Image */}
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="
              transition group-hover:scale-105
              w-24 sm:w-28 md:w-36
            "
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Content */}
        <div className="text-gray-500/60 text-sm mt-2">
          <p>{product.category}</p>

          <p className="text-gray-700 font-medium text-base md:text-lg truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 md:w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p className="text-xs md:text-sm">(4)</p>
          </div>

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mt-3 gap-2">
            <div className="flex flex-col">
              <p className="text-base md:text-xl font-medium text-indigo-500">
                {currency}
                {product.offerPrice}
              </p>
              <span className="text-xs md:text-sm text-gray-500/60 line-through">
                {currency}
                {product.price}
              </span>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="w-full xl:w-auto">
              {!cartItem[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="
                    flex items-center justify-center gap-1
                    bg-indigo-100 border border-indigo-300
                    w-full xl:w-20 h-8
                    rounded text-indigo-600 text-sm font-medium
                  "
                >
                  <img src={assets.cart_icon} alt="cart" className="w-4" />
                  Add
                </button>
              ) : (
                <div
                  className="
                    flex items-center justify-between xl:justify-center gap-1
                    w-full xl:w-20 h-8 px-1
                    bg-indigo-500/25 rounded
                  "
                >
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-2 text-lg font-medium"
                  >
                    -
                  </button>
                  <span className="w-4 text-center text-sm font-medium">
                    {cartItem[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-2 text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
