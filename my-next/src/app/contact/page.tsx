"use client";

import { ChangeEvent, useState } from "react";
import { FaHeadphones, FaLocationArrow, FaPhone } from "react-icons/fa";
type contactform = {
  name: string;
  email: string;
  website: string;
  message: string;
};
export default function Contact() {
  const [contactForm, setContactForm] = useState<contactform>({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  function handleChang(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  }
  return (
    <div className="contact container m-auto flex gap-12 justify-center items-start py-12 flex-col md:flex-row p-5 md:p-12">
      <div className="contactform basis-full md:basis-1/2">
        <div className="info flex flex-col gap-5">
          <h2 className="text-3xl font-[500]">Contact info</h2>
          <div className="">
            <h4 className="flex  gap-3 font-[400] items-center text-2xl">
              <FaLocationArrow className="text-red-500" /> Address
            </h4>
            <p className="text-gray-600 dark:text-gray-200  font-light my-3">
              160 Pennsylvania Ave NW, Washington, Castle, PA 16101-5161
            </p>
          </div>
          <div className="">
            <h4 className="flex  gap-3 font-[400] items-center text-2xl">
              <FaPhone className="text-red-500" /> Phone
            </h4>
            <p className="text-gray-600 dark:text-gray-200 font-light my-3">
              125-711-811 | 125-668-886
            </p>
          </div>
          <div className="">
            <h4 className="flex  gap-3 font-[400] items-center text-2xl">
              <FaHeadphones className="text-red-500" /> Support
            </h4>
            <p className="text-gray-600 dark:text-gray-200 font-light my-3">
              Support.photography@gmail.com
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-[500] mt-8 mb-5">SEND MESSAGE</h2>
        <form
          className="flex flex-col gap-5 "
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChang}
            className="border-2 border-gray-300 w-full p-3 rounded-sm inset-shadow-sm/10 focus:outline-none "
          />
          <input
            type="email"
            autoComplete="true"
            name="email"
            placeholder="Email"
            onChange={handleChang}
            className="border-2 border-gray-300 w-full p-3 rounded-sm inset-shadow-sm/10 focus:outline-none "
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            onChange={handleChang}
            className="border-2 border-gray-300 w-full p-3 rounded-sm inset-shadow-sm/10 focus:outline-none "
          />
          <textarea
            name="message"
            id="contactMessage"
            placeholder="Message"
            className="border-2 border-gray-300 w-full p-3 rounded-sm inset-shadow-sm/10 focus:outline-none  "
          ></textarea>
          <input
            type="submit"
            name="submit"
            id="submit"
            value={"Send Message"}
            className="bg-red-500 py-2 px-5 text-white rounded-full font-[500] w-fit "
          />
        </form>
      </div>
      <div className="basis-full md:basis-1/2 ">
        <iframe
          className="max-w-full"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d45323.02730591484!2d-74.07882651777986!3d41.046874129717935!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2sbd!4v1751293181929!5m2!1sen!2sbd"
          width="600"
          height="700"
          style={{ border: "0" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
