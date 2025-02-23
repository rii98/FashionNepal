import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useShopStore from '../store/shopStore';
import { toast } from 'react-toastify';

const PaymentStatusPage = () => {
    const { token, cartItems, clearCart, getCartAmount, delivery_fee, products } = useShopStore()
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const orderProcessed = useRef(false); // Prevent duplicate calls
    console.log("Payment Page")
    const onSubmitHandler = async () => {
        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData = {
                items: orderItems,
                address: data,
                amount: getCartAmount() + delivery_fee
            }
            switch (method) {
                case "cod":
                    const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } })
                    if (response.data.success) {
                        clearCart()
                        navigate('/orders')
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            navigate('/')
        }
    }
    useEffect(() => {
        if (!orderProcessed.current) {
            if (status === 'success') {
                onSubmitHandler()
            }
            orderProcessed.current = true; // Mark as processed
        }

        const redirectTimer = setTimeout(() => {
            navigate('/')
        }, 200);

        return () => clearTimeout(redirectTimer);
    }, [status, navigate]); // Dependencies

    return null;
};

export default PaymentStatusPage;

