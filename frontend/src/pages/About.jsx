/* eslint-disable no-unused-vars */
import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-3/4 text-gray-600">
          <p>
            Fashion Nepal is a trendy and stylish clothing brand that blends
            modern fashion with traditional Nepali influences. Known for its
            high-quality fabrics and unique designs, the brand offers a wide
            range of apparel, from casual wear to elegant ethnic outfits. Each
            piece is crafted with attention to detail, ensuring comfort and
            sophistication. Fashion Nepal aims to promote local craftsmanship
            while keeping up with global fashion trends. Whether you are looking
            for everyday wear or something special for an occasion, Fashion
            Nepal has something for everyone. The brand focuses on
            sustainability and ethical production, making it a choice for
            conscious shoppers. Experience the perfect fusion of culture and
            contemporary style with Fashion Nepal!
          </p>
          <p>
            Fashion Nepal offers a diverse range of stylish and high-quality
            clothing, including trendy casual wear, elegant ethnic and
            traditional outfits, and sophisticated formal attire. Our winter
            collection features warm and fashionable jackets, sweaters, and
            shawls, perfect for the season. We also provide customized clothing
            tailored to your unique style and fit. To complete your look,
            explore our selection of accessories, including scarves, bags, and
            jewelry. Committed to sustainability, we focus on eco-friendly
            materials and ethical production practices. Fashion Nepal blends
            tradition with modern trends, ensuring style and comfort for every
            occasion
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to redefine style by blending traditional Nepali
            craftsmanship with modern fashion trends. We aim to provide
            high-quality, comfortable, and affordable clothing that reflects
            cultural heritage while embracing contemporary designs. Our focus is
            on promoting local artisans and sustainable fashion through ethical
            production practices. We strive to inspire confidence and
            individuality in our customers by offering unique and stylish
            apparel. Fashion Nepal is dedicated to creating a positive impact in
            the fashion industry by prioritizing quality, innovation, and
            sustainability. Our goal is to make Nepali fashion globally
            recognized while supporting local communities
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            {" "}
            At Fashion Nepal, we ensure top-notch quality by using premium
            fabrics and meticulous craftsmanship in every piece. Our strict
            quality control process guarantees durability, comfort, and flawless
            design. Customer satisfaction is our priority, and we stand by our
            commitment to excellence
          </p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            {" "}
            Fashion Nepal offers a seamless shopping experience with easy online
            ordering, fast delivery, and hassle-free returns. Our user-friendly
            platform and responsive customer support ensure a smooth and
            convenient shopping journey. Enjoy fashion at your fingertips with
            Fashion Nepal!
          </p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            {" "}
            At Fashion Nepal, we prioritize customer satisfaction with
            responsive support, easy returns, and a hassle-free shopping
            experience. Our dedicated team is always ready to assist you,
            ensuring a smooth and enjoyable journey from browsing to delivery.
            Your happiness is our commitment!
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
