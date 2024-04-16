import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  BronzeCrownIcon,
  CrownIcon,
  SilverCrownIcon,
} from "../../assets/icons/Icons";

const LeaderCard = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const getRank = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/daily`)
      .then((res) => {
        setData(res.data.leader.leaderBoard);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRank();
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col mx-4 items-end gap-2">
          {/* 1 */}
          <div className="w-full h-[100%] flex flex-col items-center">
            <CrownIcon className="w-1/4" />
            <div className="w-full justify-end flex bg-gold flex-col items-center rounded-t-md">
              <img
                src={data[0]?.imageURL}
                alt="Gold"
                className="w-24 h-24 top-[10vh] shadow-lg object-cover rounded-full border-4 border-gold"
              />
              <div className="flex flex-col items-center text-black">
                <h1 className="text-center font-bold text-xs">
                  {data[0]?.name}
                </h1>
                <h1 className="font-bold">{data[0]?.userPoints}</h1>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-4">
            {/* 2 */}
            <div className="w-1/2 h-[90%] flex flex-col items-center mb-2">
              <SilverCrownIcon className="w-1/2 md:1/5" />
              <div className="w-full justify-end flex bg-silver flex-col items-center rounded-t-md">
                <img
                  src={data[1]?.imageURL}
                  alt="Silver"
                  className="w-24 h-24 top-[10vh] shadow-lg object-cover rounded-full border-4 border-silver"
                />
                <div className="flex flex-col items-center text-black">
                  <h1 className="text-center font-bold text-xs">
                    {data[1]?.name}
                  </h1>
                  <h1 className="font-bold">{data[1]?.userPoints}</h1>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="w-1/2 h-[90%] flex flex-col items-center">
              <BronzeCrownIcon className="w-1/2 md:1/5" />
              <div className="w-full justify-end flex bg-bronze flex-col items-center rounded-t-md">
                <img
                  src={data[2]?.imageURL}
                  alt="Bronze"
                  className="w-24 h-24 top-[10vh] shadow-lg object-cover rounded-full border-4 border-bronze"
                />
                <div className="flex flex-col items-center text-black">
                  <h1 className="text-center font-bold text-xs">
                    {data[2]?.name}
                  </h1>
                  <h1 className="font-bold">{data[2]?.userPoints}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderCard;
