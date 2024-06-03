import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Assuming your root state is defined in the store

const Header = () => {
  // Define the type for the user state
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/add-product">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Invoice PDF</span>
            <span className="text-slate-700">Generator</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar} 
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
