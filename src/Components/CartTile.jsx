import React, { Fragment, useContext } from "react";
import { ShoppingCartContext } from "./Context";

const CartTile = ({singleCartItem}) => {
    const {handleRemoveFromCart, handleAddToCart} = useContext(ShoppingCartContext);
    return(
        <Fragment>
            <div className="grid grid-cols-3 item-start gap-5">
                <div className="col-span-2 flex item start gap-4">
                    <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm ">
                        <img 
                        src={singleCartItem.thumbnail}
                        className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{singleCartItem.title}</h3>
                        <button onClick={() => handleRemoveFromCart(singleCartItem, true)} className="text-sm px-4 py-2 bg-black text-white font-bold rounded">REMOVE</button>
                    </div>
                </div>
                <div className="ml-auto">
                    <h3 className="text-lg font-bold text-gray-900">
                        $ {singleCartItem.totalprice.toFixed(2)}
                        <p className="mt-2 mb-3 font-bold text-[16px]">Quantity: {singleCartItem.quantity}</p>
                    </h3>
                    <div className="mt-3">
                        <button 
                        onClick={() => handleRemoveFromCart(singleCartItem, false)} 
                        className="disabled:opacity-20 border border-[#000] px-2 rounded"
                        disabled={singleCartItem.quantity === 1}
                        >-</button>
                        <button  onClick={() => handleAddToCart(singleCartItem)} className="border border-[#000] px-2 rounded">+</button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-500" />
        </Fragment>
    );
}

export default CartTile;