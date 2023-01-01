import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      className={`sticky h-16 container mx-auto flex justify-between items-center px-8 top-0 bg-white`}
    >
      <div className={`font-bold text-xl flex gap-2 items-center`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
          />
        </svg>
        React Challenges
      </div>

      <ul className={`flex gap-4`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive && "text-blue-700"} hover:text-blue-700 font-medium`
            }
          >
            Challenges
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive && "text-blue-700"} hover:text-blue-700 font-medium`
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
