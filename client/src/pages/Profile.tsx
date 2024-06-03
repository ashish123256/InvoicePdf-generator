import { useDispatch, useSelector } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/userSlice";
import { RootState, AppDispatch } from "../../redux/store";

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      dispatch(signOutFailure(errorMessage));
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="name"
          defaultValue={currentUser.name}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
        />
      </form>
      <div className="flex justify-center mt-5">
        <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
