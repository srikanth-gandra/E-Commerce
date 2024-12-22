import React, { useContext } from "react";
import { ShoppingCartContext } from "./Context";
import ProductItem from "./ProductItem";

const ProductList = () => {
    const { listOfProducts, loading } = useContext(ShoppingCartContext)

    console.log(listOfProducts);
    
    if(loading) return <h1>Loading data! Please Wait..</h1>

    return(
        <section className="py-12 bg-white sm:py-16 lg:py-2">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7x">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
                        Our Feature Products
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
                    {
                        listOfProducts && listOfProducts.length > 0 ?
                        listOfProducts.map((singleProductTitle) => <ProductItem singleProductTitle= {singleProductTitle} />) :
                        <h2>No Products Found</h2>
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductList;