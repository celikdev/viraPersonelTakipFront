import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { LeaderCard, LeaderCarousel } from "../components/Leader";
import Best from "../components/Best";
import { timelineContext } from "../Context/Timeline";
import { Link } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { UserIcon } from "../assets/icons/Icons";

const Home = () => {
  const { timeline, setTimeline } = useContext(timelineContext);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTotals = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${timeline}`)
      .then((res) => setTotal(res.data.total))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTotals();
  }, [timeline]);

  return (
    <div className="flex flex-col gap-4 relative overflow-x-hidden">
      <div className="w-[180vw] h-96 absolute -z-10 rounded-b-full -left-[40vw] bg-gradient-to-t from-purple-800 to-purple-400" />
      <Link to="/admin" className="flex justify-end mx-10 mt-4">
        <UserIcon />
      </Link>
      <Button />
      <div>
        <h1 className="text-center my-4 text-xl font-extrabold text-white">
          {timeline === "daily" ? "Günlük" : "Aylık"} Liderler
        </h1>
        <LeaderCard />
      </div>
      <LeaderCarousel />
      {/* <Best /> */}
      <div
        className={`bg-gray-300 mx-4 p-4 rounded-lg ${
          loading ? "flex items-center justify-center" : ""
        }`}
      >
        {loading ? (
          <HashLoader size={20} color="#6366F1" />
        ) : (
          <span className="flex text-sm font-bold">
            Toplam: &nbsp; <h1 className="font-extrabold">{total}</h1>
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
