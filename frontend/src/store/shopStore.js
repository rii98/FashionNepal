import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { toast } from "react-toastify";
import axios from "axios";


const shopStore = (set, get) => ({
   
    currency: "Rs.",
    delivery_fee: 40,
    url: import.meta.env.VITE_BACKEND_URL,
    products: [],
    search: "",
    setSearch: (searchValue) => set({ search: searchValue }),
    showSearch: false,
    setShowSearch: (isVisible) => set({ showSearch: isVisible }),
    cartItems: {},
    clearCart:()=>set({cartItems:{}}),
    token:"",
    setToken:(tokenVal)=>set({token:tokenVal}),
    

    addToCart: async (itemId, size) => {
        const cartData = structuredClone(get().cartItems || {});
        if (!size) {
            toast.error("Please select size");
            return;
        }
    
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
    
        set({ cartItems: cartData });
    
        const token = localStorage.getItem("token"); 
        if (!token) {
            toast.error("User not authenticated");
            return;
        }
    
        get().setToken(token);
    
        try {
            const response = await axios.post(
                `${get().url}/api/cart/add`,
                { itemId, size },
                { headers: { token } }
            );
    
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },
    

    getCartCount: () => {
        let totalCount = 0;
        for (let items in get().cartItems) {
            for (let size in get().cartItems[items]) {
                if (get().cartItems[items][size] > 0) {
                    totalCount += get().cartItems[items][size];
                }
            }
        }
        return totalCount;
    },

    updateQuantity: async (itemId, size, quantity) => {
        const cartData = structuredClone(get().cartItems || {});
        cartData[itemId][size] = quantity;
        set({ cartItems: cartData });

        const token = localStorage.getItem("token"); 
        if (!token) {
            toast.error("User not authenticated");
            return;
        }
    
        get().setToken(token);
    
        try {
            const response = await axios.post(
                `${get().url}/api/cart/update`,
                {itemId,size, quantity },
                { headers: { token } }
            );
    
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    getCartAmount: () => {
        let totalAmount = 0;
        const products = get().products; // Ensure we get the latest products

        for (let items in get().cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue; // Prevent errors if product isn't found
            for (let size in get().cartItems[items]) {
                if (get().cartItems[items][size] > 0) {
                    totalAmount += itemInfo.price * get().cartItems[items][size];
                }
            }
        }
        return totalAmount;
    },

    getProductsData: async () => {
        try {
            const response = await axios.get(get().url + "/api/product/list");
            if (response.data.success){
                set({ products: response.data.products });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    getUserCart:async()=>{
        const token = localStorage.getItem("token"); 
        if (!token) {
            toast.error("User not authenticated");
            return;
        }
    
        get().setToken(token);
        try {
            const response = await axios.post(
                `${get().url}/api/cart/get`,
                {},
                { headers: { token } }
            );
    
            if (response.data.success) {   
                set({cartItems:response.data.cartData})
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
});

const useShopStore = create(
    devtools(
        persist(shopStore, {
            name: "shop-store",
        })
    )
);

export default useShopStore;


