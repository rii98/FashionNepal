import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useShopStore from '../store/shopStore';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentStatusPage = () => {
    const { token, cartItems, clearCart, getCartAmount, delivery_fee, products } = useShopStore();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const orderProcessed = useRef(false); // Prevent duplicate calls
    const url = import.meta.env.VITE_BACKEND_URL
    console.log("Payment Page");

    const onSubmitHandler = async () => {
        const selectedAddress = JSON.parse(localStorage.getItem('orderAddress') || '{}');
        console.log(selectedAddress);


        console.log("inside on submit handler")
        try {
            let orderItems = [];
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const product = products.find(p => p._id === itemId);
                        if (product) {
                            orderItems.push({
                                ...product, // Clone object
                                size,
                                quantity: cartItems[itemId][size]
                            });
                        }
                    }
                }
            }

            const orderData = {
                items: orderItems,
                address: selectedAddress, // Ensuring address is correctly retrieved
                amount: getCartAmount() + delivery_fee
            };

           console.log(selectedAddress)

            if (!selectedAddress) {
                throw new Error("Delivery address is missing.");
            }

            const response = await axios.post(`${url}/api/order/place-esewa`, orderData, { headers: { token } });
            console.log(response);
            if (response.data.success) {
                clearCart();
                toast.success(response.data.message);
                navigate('/orders');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            navigate('/');
        }
    };

    useEffect(() => {
        if (!orderProcessed.current && status === 'success') {
            console.log("useeeffeect")
            onSubmitHandler();
            orderProcessed.current = true; // Mark as processed
        }
        if (!orderProcessed.current && status === 'failure'){
            console.log("inside failure")
        }
    }, [status, navigate]);

    return null;
};

export default PaymentStatusPage;
