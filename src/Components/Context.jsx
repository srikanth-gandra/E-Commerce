import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [listOfProducts, setListOfProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const fetchListOfProducts = async () => {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();

        if (result && result.products) {
            setListOfProducts(result.products)
            setLoading(false)
        }
    }

    const handleAddToCart = (getProductDetails) => {
        console.log(getProductDetails);

        let copyExistingCartItems = [...cartItems];
        const findIndexOfCurrentItem = copyExistingCartItems.findIndex(cartItem => cartItem.id === getProductDetails.id)

        console.log(findIndexOfCurrentItem);

        if (findIndexOfCurrentItem === -1) {
            copyExistingCartItems.push({
                ...getProductDetails,
                quantity: 1,
                totalprice: getProductDetails.price
            })
        } else {
            copyExistingCartItems[findIndexOfCurrentItem] = {
                ...copyExistingCartItems[findIndexOfCurrentItem],
                quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
                totalprice: (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) * copyExistingCartItems[findIndexOfCurrentItem].price,
            }
        }

        console.log(copyExistingCartItems, 'copyExistingCartItems');
        setCartItems(copyExistingCartItems);
        localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
        navigate('/cart-list');
    }

    const handleRemoveFromCart = (getProductDetails, isFullyRemovedFromCart) => {
        let copyExistingCartItems = [...cartItems];
        const findIndexOfCurrentItem = copyExistingCartItems.findIndex(item => item.id === getProductDetails.id);

        if (isFullyRemovedFromCart) {
            copyExistingCartItems.splice(findIndexOfCurrentItem, 1);
        } else {
            copyExistingCartItems[findIndexOfCurrentItem] = {
                ...copyExistingCartItems[findIndexOfCurrentItem],
                quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity - 1,
                totalprice: (copyExistingCartItems[findIndexOfCurrentItem].quantity - 1) * copyExistingCartItems[findIndexOfCurrentItem].price,
            }
        }

        localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
        setCartItems(copyExistingCartItems);
    }

    useEffect(() => {
        fetchListOfProducts();
        setCartItems(JSON.parse(localStorage.getItem('cartItems') || []));
    }, [])

    console.log(cartItems);

    return (
        <ShoppingCartContext.Provider
            value={{
                listOfProducts, loading, setLoading, productDetails, setProductDetails, handleAddToCart, cartItems, handleRemoveFromCart
            }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;