import React, { useContext } from "react";
import "./Profile.scss";
import { images } from "../../contstans";
import { UserContext } from "../../context/userContext";
const Profile = () => {
  const [state] = useContext(UserContext);

  console.log(state);

  return (
    <div className="app__profile">
      <div className="app__profile-wrapper">
        {/* {user?.map((item, index) => (
            <> */}
        <div className="app__profile-left">
          <h1 className="Profile__title">Personal Info</h1>

          <div className="profile">
            <img src={images.user} alt="user-img" />
            <p className="p-text">
              {state.user.fullname}
              <span>Full Name</span>
            </p>
          </div>
          <div className="profile">
            <img src={images.mail} alt="mail-img" />
            <p className="p-text">
              {state.user.email}
              <span>email</span>
            </p>
          </div>
          <div className="profile">
            <img src={images.status} alt="mail-img" />
            <p className="p-text">
              {state.user.status}
              <span>Status</span>
            </p>
          </div>
          <div className="profile">
            <img src={images.gender} alt="mail-img" />
            <p className="p-text">
              {state.user.gender}
              <span>Gender</span>
            </p>
          </div>
          <div className="profile">
            <img src={images.telp} alt="mail-img" />
            <p className="p-text">
              {state.user.phone}
              <span>Mobile phone</span>
            </p>
          </div>
          <div className="profile">
            <img src={images.loct} alt="mail-img" />
            <p className="p-text">
              {state.user.address}
              <span>Address</span>
            </p>
          </div>
        </div>
        <div className="app__profile-right">
          <img src={images.avatar2} alt="avatar" />
          <div className="profile__button">
            <button type="button">Change Photo Profile</button>
          </div>
        </div>
        {/* </>
        ))} */}
      </div>
    </div>
  );
};

export default Profile;
