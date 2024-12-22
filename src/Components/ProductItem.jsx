import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "./Context";

const ProductItem = ({ singleProductTitle }) => {
    const navigate = useNavigate();
    const { handleAddToCart,cartItems } = useContext(ShoppingCartContext);

    const handleNavigateToDEtails = (getCurrentProductId) => {
        navigate(`/product-details/${getCurrentProductId}`)

    }
    return (
        <div className="relative group border border-cyan-700 p-6 cursor-pointer">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img src={singleProductTitle.thumbnail}
                    alt={singleProductTitle.title}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                />
            </div>
            <div className="flex item-start justify-between mt-4 space-x-4">
                <div className="text-gray-900 sm:text-sm text-xs md:text-base font-bold">
                    <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{singleProductTitle.title}</p>
                </div>
            </div>
            <div className="text-right ">
                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">{singleProductTitle.price}</p>
            </div>
            <button onClick={() => handleNavigateToDEtails(singleProductTitle.id)} className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-large">View Details</button>
            <button disabled ={cartItems.findIndex(item => item.id === singleProductTitle.id) > -1 }
            onClick={() => handleAddToCart(singleProductTitle)} className="disabled:opacity-20  px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-large">Add to Cart</button>
        </div>
    )
}

export default ProductItem;