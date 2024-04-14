import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HashLoader } from "react-spinners";

import HakanImage from "../../assets/images/Hakan.jpg";
import axios from "axios";
import { timelineContext } from "../../Context/Timeline";

const LeaderCarousel = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { timeline } = useContext(timelineContext);

  const getUsers = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${timeline}`)
      .then((res) => {
        setUser(res.data.leader.leaderBoard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, [timeline]);
  return (
    <>
      {loading ? (
        <div className="h-24 flex items-center justify-center">
          <HashLoader size={32} color="#6366F1" />
        </div>
      ) : (
        <Carousel
          autoPlay
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          infiniteLoop={true}
          interval={3000}
        >
          {user?.map((item, index) => (
            <div
              key={index}
              className="h-24 bg-gray-300 flex items-center p-4 mx-4 gap-4 rounded-xl"
            >
              <h1 className="font-black text-5xl text-gray-300 p-1 bg-gradient-to-tr from-violet-500 to-fuchsia-500">
                {index + 1}
              </h1>
              <img
                src={item.imageURL}
                alt="Hakan Çelik"
                className="rounded-full !w-20 h-20 object-cover"
              />
              <div className="h-full flex flex-col items-start ">
                <h1 className="font-bold text-md">{item.name}</h1>
                <h1 className="font-bold text-md">{item.userPoints}</h1>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default LeaderCarousel;
