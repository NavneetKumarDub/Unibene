import React from "react";
import { Link } from "react-router-dom";
import { SiDell, SiHp, SiSamsung, SiAdobe } from "react-icons/si";
import { FaApple, FaSpotify } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black min-h-16 text-white flex justify-around items-center py-4">

      <Link to="/all?brand=dell" className="hover:scale-110 transition">
        <SiDell size={40} />
      </Link>

      <Link to="/all?brand=hp" className="hover:scale-110 transition">
        <SiHp size={40} />
      </Link>

      <Link to="/all?brand=apple" className="hover:scale-110 transition">
        <FaApple size={40} />
      </Link>

      <Link to="/all?brand=samsung" className="hover:scale-110 transition">
        <SiSamsung size={40} />
      </Link>

      <Link to="/all?brand=adobe" className="hover:scale-110 transition">
        <SiAdobe size={40} />
      </Link>

      <Link to="/all?brand=spotify" className="hover:scale-110 transition">
        <FaSpotify size={40} />
      </Link>

    </div>
  );
};

export default Footer;
