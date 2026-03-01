import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount } = useAppContext();

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">


      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" className="w-32" />
      </NavLink>


      <div className="hidden lg:flex items-center gap-8">

        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>


        <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}

            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>


        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center text-[10px] bg-indigo-500 text-white rounded-full">
            {getCartCount()}
          </span>
        </div>


        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-10 cursor-pointer"
            />

            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border py-2 w-32 rounded-md text-sm z-50">
              <li
                onClick={() => navigate("/my-orders")}
                className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logOut}
                className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>


      <div className="flex items-center gap-6 sm:hidden">
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center text-[10px] bg-indigo-500 text-white rounded-full">
            {getCartCount()}
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <img src={assets.menu_icon} alt="menu" className="w-7" />
        </button>

      </div>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4
        flex flex-col items-start gap-3 px-5 text-sm lg:hidden z-40">

          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="mt-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logOut}
              className="mt-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
