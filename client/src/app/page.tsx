"use client";
import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import HomePage from "../components/Home/HomePage";

export default function Home() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <Heading
        description="A comprehensive system for managing hotel room bookings and guest services"
        keywords="Hotel,Room Management,Bookings,Guest Services"
        title="Home"
      />
      <div className="fixed w-full z-[99]">
        <Header activeItem={activeItem} />
      </div>
      <HomePage />
    </>
  );
}
