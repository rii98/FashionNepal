/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    sizes: [],
    bestSeller: false,
  });

  const url=import.meta.env.VITE_BACKEND_URL

  const onChangeHandler = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const toggleSize = (size) => {
    setData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("category",data.category)
      formData.append("subCategory",data.subCategory)
      formData.append("price",data.price)
      formData.append("sizes",JSON.stringify(data.sizes))
      formData.append("bestSeller",data.bestSeller)
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      const response = await axios.post(`${url}/api/product/add`,formData,{headers:{token}})
      if(response.data.success){
        toast.success("Product added successfully")
        setData({
          name: "",
          description: "",
          category: "Men",
          subCategory: "Topwear",
          price: "",
          sizes: [],
          bestSeller: false,
        })
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt="upload_area"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write product name"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          rows={5}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Describe the product"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            name="subCategory"
            onChange={onChangeHandler}
            value={data.subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product price</p>
          <input
            name="price"
            onChange={onChangeHandler}
            value={data.price}
            className="w-fulll px-3 py-2 sm:w-[120px]"
            type="number"
            min={0}
            placeholder="150"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => toggleSize("S")}>
            <p
              className={`px-3 py-1 cursor-pointer ${
                data.sizes.includes("S")
                  ? " border border-black bg-white"
                  : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div onClick={() => toggleSize("M")}>
            <p className={`px-3 py-1 cursor-pointer ${
                data.sizes.includes("M")
                  ? " border border-black bg-white"
                  : "bg-slate-200"
              }`}>M</p>
          </div>
          <div onClick={() => toggleSize("L")}>
            <p className={`px-3 py-1 cursor-pointer ${
                data.sizes.includes("L")
                  ? " border border-black bg-white"
                  : "bg-slate-200"
              }`}>L</p>
          </div>
          <div onClick={() => toggleSize("XL")}>
            <p className={`px-3 py-1 cursor-pointer ${
                data.sizes.includes("XL")
                  ? " border border-black bg-white"
                  : "bg-slate-200"
              }`}>XL</p>
          </div>
          <div onClick={() => toggleSize("XXL")}>
            <p className={`px-3 py-1 cursor-pointer ${
                data.sizes.includes("XXL")
                  ? " border border-black bg-white"
                  : "bg-slate-200"
              }`}>XXL</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          checked={data.bestSeller}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              bestSeller: e.target.checked,
            }))
          }
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add To BestSeller
        </label>
      </div>

      <button
        className="w-28 cursor-pointer mt-4  py-3   text-white bg-black"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
