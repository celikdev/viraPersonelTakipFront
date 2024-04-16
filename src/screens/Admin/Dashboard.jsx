import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { HomeIcon } from "../../assets/icons/Icons";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [newUserPoint, setNewUserPoint] = useState();
  const [updateImageLoading, setUpdateImageLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleUpdateUser = async () => {
    setUpdateLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/user/update/${selectedUser._id}`,
        {
          userPoints: Number(newUserPoint),
        }
      )
      .then((res) => {
        setOpen(false);
        setNewUserPoint("");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setUpdateLoading(false);
        getUsers();
      });
  };

  const handleDeleteUser = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/user/delete/${selectedUser._id}`
      )
      .then((res) => setOpen(false))
      .catch((err) => console.log(err))
      .finally(() => getUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="my-4 flex flex-col gap-8">
      <Modal open={open} setOpen={setOpen}>
        {selectedUser ? (
          <div className="flex flex-col h-full justify-around">
            <div className="flex flex-col items-center gap-4">
              {/* Click and select image */}
              {updateImageLoading ? (
                <HashLoader size={24} color="#6366F1" />
              ) : (
                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.click();
                    input.onchange = async (e) => {
                      const file = e.target.files[0];
                      const formData = new FormData();
                      formData.append("image", file);
                      setUpdateImageLoading(true);
                      const res = await axios
                        .post(
                          `${process.env.REACT_APP_API_URL}/api/user/update-user-image/${selectedUser._id}`,
                          formData
                        )
                        .then((res) => {
                          setUpdateImageLoading(false);
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {
                          setUpdateImageLoading(false);
                          getUsers();
                          setOpen(false);
                        });

                      // const imageURL = res.data.imageURL;
                      // setSelectedUser({ ...selectedUser, imageURL });
                    };
                  }}
                  onMouseOver={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
                  className="flex flex-col items-center relative justify-center"
                >
                  <img
                    src={selectedUser.imageURL}
                    alt="userImage"
                    className={`w-32 h-32 rounded-full transition-all duration-300 ${
                      isVisible && "opacity-50 filter blur-sm grayscale"
                    }`}
                  />
                  <h1
                    className={`absolute opacity-0 transition-all duration-300  ${
                      isVisible && "opacity-100 visible"
                    }`}
                  >
                    Değiştirmek İçin Tıkla
                  </h1>
                </button>
              )}
              <span className="font-semibold">{selectedUser.name}</span>
              <span className="font-semibold">
                Puan: {selectedUser.userPoints}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              <input
                onChange={(e) => setNewUserPoint(e.target.value)}
                value={newUserPoint}
                type="number"
                className="w-11/12 border-2 border-purple-400 p-2 rounded-lg font-medium text-sm outline-none transition-colors duration-300 focus:border-purple-400"
                placeholder="Puan"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => handleDeleteUser()}
                  className="font-semibold transition-all hover:bg-red-400 hover:text-white duration-300 text-sm border-2 px-6 py-2 focus:bg-red-400 focus:text-white border-red-400 rounded-lg"
                >
                  Kullanıcıyı Sil
                </button>
                <button
                  onClick={() => handleUpdateUser()}
                  className="font-semibold transition-all duration-300 text-sm border-2 px-6 py-2 focus:bg-purple-400 focus:text-white border-purple-400 rounded-lg"
                >
                  {updateLoading ? <HashLoader size={18} /> : "Kaydet"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <HashLoader size={24} color="#6366F1" />
        )}
      </Modal>
      <div className="flex justify-between items-center mx-10">
        <Link to="/">
          <HomeIcon />
        </Link>
        <h1 className="font-semibold text-center">Yönetim</h1>
        <Link
          to="/admin/dashboard/add"
          className="text-right mx-4 font-semibold text-sm"
        >
          Kullanıcı Ekle
        </Link>
      </div>
      <div className="flex flex-col gap-4 ">
        {loading ? (
          <div className="flex justify-center">
            <HashLoader loading={loading} size={32} color="#6366F1" />
          </div>
        ) : (
          users.map((user, index) => (
            <button
              onClick={() => {
                setSelectedUser(user);
                setOpen(true);
              }}
              key={index}
              className={`flex items-center justify-between mx-4 group px-4 py-2 rounded-lg ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.imageURL}
                  alt="userImage"
                  className="w-16 h-16 rounded-full"
                />
                <span className="font-semibold">{user.name}</span>
              </div>
              <div>
                <span className="font-semibold">{user.userPoints}</span>
              </div>
              <div className="group-focus:visible hidden bg-red-400">
                <span className="font-semibold">{user.userPoints}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
