import React from "react";
import "./LeftNav.scss";
import { Link, NavLink } from "react-router-dom";
import LOGO from "../../assets/images/logo.svg";
import { useAuth } from "../../context/AuthContext";

const LeftNav = () => {
  const { logout } = useAuth();
  return (
    <div className="left-nav">
      <div className="left-nav-grp">
        <Link to="/dashboard/products" className="logo">
          <img src={LOGO} alt="" />
        </Link>
        <ul className="nav-items">
          <li>
            <NavLink to="/dashboard/products" className="nav-item">
              <svg
                width={24}
                height={24}
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.001 13.3c-.13 0-.26-.03-.38-.1l-8.83-5.11a.752.752 0 11.76-1.3l8.45 4.89 8.4-4.86a.76.76 0 011.03.27c.21.36.08.82-.27 1.03l-8.77 5.08a.94.94 0 01-.39.1z"
                  fill=""
                />
                <path
                  d="M12.001 22.36c-.41 0-.75-.34-.75-.75v-9.07c0-.41.34-.75.75-.75s.75.34.75.75v9.07c0 .41-.34.75-.75.75z"
                  fill=""
                />
                <path
                  d="M12.001 22.75c-.88 0-1.75-.19-2.44-.57l-5.34-2.97c-1.45-.8-2.58-2.73-2.58-4.39V9.17c0-1.66 1.13-3.58 2.58-4.39l5.34-2.96c1.37-.76 3.51-.76 4.88 0l5.34 2.97c1.45.8 2.58 2.73 2.58 4.39v5.65c0 1.66-1.13 3.58-2.58 4.39l-5.34 2.96c-.69.38-1.56.57-2.44.57zm0-20c-.63 0-1.25.13-1.71.38L4.951 6.1c-.96.53-1.81 1.97-1.81 3.07v5.65c0 1.1.85 2.54 1.81 3.08l5.34 2.97c.91.51 2.51.51 3.42 0l5.34-2.97c.96-.54 1.81-1.97 1.81-3.08V9.17c0-1.1-.85-2.54-1.81-3.08l-5.34-2.97c-.46-.24-1.08-.37-1.71-.37z"
                  fill=""
                />
              </svg>
              Marketplace
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/shedule" className="nav-item">
              <svg
                width={24}
                height={24}
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 14.75H2c-.41 0-.75-.34-.75-.75V7.62c0-.32.2-.6.49-.71.3-.11.63-.02.83.22.61.73 1.56 1.14 2.5 1.11.8-.02 1.54-.32 2.1-.85.26-.22.47-.48.63-.77.31-.53.46-1.11.45-1.7-.02-.92-.42-1.76-1.1-2.37a.748.748 0 01-.21-.83c.11-.29.39-.49.7-.49H15c.41 0 .75.34.75.75v10c0 1.54-1.23 2.77-2.75 2.77zm-10.25-1.5H13c.69 0 1.25-.56 1.25-1.25V2.75H9.19c.35.65.54 1.38.56 2.14.02.87-.2 1.73-.64 2.48-.24.43-.57.84-.93 1.14-.8.76-1.9 1.21-3.07 1.24-.83.03-1.65-.18-2.35-.56v4.06h-.01z"
                  fill=""
                />
                <path
                  d="M19 20.75h-1c-.41 0-.75-.34-.75-.75a1.25 1.25 0 00-2.5 0c0 .41-.34.75-.75.75h-4c-.41 0-.75-.34-.75-.75a1.25 1.25 0 00-2.5 0c0 .41-.34.75-.75.75H5c-2.07 0-3.75-1.68-3.75-3.75v-3c0-.41.34-.75.75-.75h11c.69 0 1.25-.56 1.25-1.25V5c0-.41.34-.75.75-.75h1.84c.99 0 1.9.53 2.39 1.39l1.71 2.99c.13.23.13.52 0 .75-.13.23-.38.37-.65.37H19c-.14 0-.25.11-.25.25v3c0 .14.11.25.25.25h3c.41 0 .75.34.75.75v3c0 2.07-1.68 3.75-3.75 3.75zm-.35-1.5H19c1.24 0 2.25-1.01 2.25-2.25v-2.25H19c-.96 0-1.75-.79-1.75-1.75v-3c0-.96.78-1.75 1.75-1.75l-1.07-1.87c-.22-.39-.64-.63-1.09-.63h-1.09V12c0 1.52-1.23 2.75-2.75 2.75H2.75V17c0 1.24 1.01 2.25 2.25 2.25h.35c.33-1.15 1.39-2 2.65-2s2.32.85 2.65 2h2.71c.33-1.15 1.39-2 2.65-2s2.31.85 2.64 2z"
                  fill=""
                />
                <path
                  d="M8 22.75c-1.52 0-2.75-1.23-2.75-2.75S6.48 17.25 8 17.25s2.75 1.23 2.75 2.75S9.52 22.75 8 22.75zm0-4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM16 22.75c-1.52 0-2.75-1.23-2.75-2.75s1.23-2.75 2.75-2.75 2.75 1.23 2.75 2.75-1.23 2.75-2.75 2.75zm0-4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM22 14.75h-3c-.96 0-1.75-.79-1.75-1.75v-3c0-.96.79-1.75 1.75-1.75h1.29c.27 0 .52.14.65.38l1.71 3c.06.11.1.24.1.37v2c0 .41-.34.75-.75.75zm-3-5c-.14 0-.25.11-.25.25v3c0 .14.11.25.25.25h2.25V12.2l-1.4-2.45H19zM5 9.75C2.38 9.75.25 7.62.25 5c0-1.46.65-2.81 1.78-3.71C2.87.62 3.93.25 5 .25 7.62.25 9.75 2.38 9.75 5c0 1.36-.59 2.66-1.62 3.56-.87.77-1.98 1.19-3.13 1.19zm0-8c-.74 0-1.44.25-2.03.72C2.2 3.08 1.75 4.01 1.75 5c0 1.79 1.46 3.25 3.25 3.25.78 0 1.54-.29 2.15-.81.7-.62 1.1-1.5 1.1-2.44 0-1.79-1.46-3.25-3.25-3.25z"
                  fill=""
                />
                <path
                  d="M4 6.75c-.25 0-.5-.13-.64-.36-.21-.36-.1-.82.26-1.03l.89-.53V3.75c0-.41.34-.75.75-.75s.75.34.75.75v1.5c0 .26-.14.51-.36.64l-1.25.75c-.14.08-.27.11-.4.11z"
                  fill=""
                />
              </svg>
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/database" className="nav-item">
              <svg
                width={24}
                height={24}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.29 22.75H5.71c-3.4 0-3.58-1.87-3.73-3.38l-.4-5.01c-.09-.97.19-1.94.81-2.72a3.74 3.74 0 012.92-1.39h13.38c1.11 0 2.16.49 2.87 1.34l.17.23c.54.74.78 1.64.69 2.55l-.4 4.99c-.15 1.52-.33 3.39-3.73 3.39zm-12.98-11c-.67 0-1.31.3-1.73.82l-.07.07c-.32.41-.49.99-.43 1.59l.4 5.01c.14 1.46.2 2.01 2.23 2.01h12.58c2.04 0 2.09-.55 2.23-2.02l.4-5.01a2.18 2.18 0 00-.5-1.64l-.1-.12c-.45-.47-1.02-.71-1.64-.71H5.31z"
                  fill=""
                />
                <path
                  d="M20.5 12.22c-.41 0-.75-.34-.75-.75V9.68c0-2.98-.52-3.5-3.5-3.5H13.7c-1.13 0-1.52-.4-1.95-.97L10.46 3.5c-.44-.58-.54-.72-1.44-.72H7.75c-2.98 0-3.5.52-3.5 3.5v5.15c0 .41-.34.75-.75.75s-.75-.34-.75-.75V6.28c0-3.83 1.17-5 5-5h1.28c1.54 0 2.02.5 2.64 1.32l1.28 1.7c.27.36.29.38.76.38h2.55c3.83 0 5 1.17 5 5v1.79a.77.77 0 01-.76.75zM14.57 17.75H9.43c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.14a.749.749 0 110 1.5z"
                  fill=""
                />
              </svg>
              Database
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/scrapify" className="nav-item">
              <svg
                width={24}
                height={24}
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.08c-.13 0-.26-.03-.38-.1l-5.3-3.06a.742.742 0 01-.27-1.02.75.75 0 011.03-.27L12 11.48l4.89-2.83a.76.76 0 011.03.27c.21.36.08.82-.27 1.02l-5.26 3.04a.94.94 0 01-.39.1z"
                  fill=""
                />
                <path
                  d="M12 18.52c-.41 0-.75-.34-.75-.75v-5.44c0-.41.34-.75.75-.75s.75.34.75.75v5.44c0 .41-.34.75-.75.75z"
                  fill=""
                />
                <path
                  d="M12 18.75c-.58 0-1.15-.13-1.61-.38l-3.2-1.78c-.96-.53-1.7-1.8-1.7-2.9V10.3c0-1.09.75-2.37 1.7-2.9l3.2-1.78c.92-.51 2.3-.51 3.22 0l3.2 1.78c.96.53 1.7 1.8 1.7 2.9v3.39c0 1.09-.75 2.37-1.7 2.9l-3.2 1.78c-.46.25-1.03.38-1.61.38zm0-12c-.33 0-.65.06-.88.19l-3.2 1.78c-.49.27-.93 1.03-.93 1.58v3.39c0 .56.44 1.31.93 1.58l3.2 1.78c.46.26 1.3.26 1.76 0l3.2-1.78c.49-.27.93-1.03.93-1.58V10.3c0-.56-.44-1.31-.93-1.58l-3.2-1.78c-.23-.13-.55-.19-.88-.19zM15 22.75a.752.752 0 01-.64-1.14l1.05-1.75c.21-.35.67-.47 1.03-.26.36.21.47.67.26 1.03l-.27.45c2.76-.65 4.83-3.13 4.83-6.09 0-.41.34-.75.75-.75s.75.34.75.75c-.01 4.28-3.49 7.76-7.76 7.76zM2 9.75c-.41 0-.75-.34-.75-.75 0-4.27 3.48-7.75 7.75-7.75a.752.752 0 01.64 1.14L8.59 4.14c-.21.35-.67.47-1.03.26a.749.749 0 01-.26-1.03l.27-.45c-2.76.65-4.83 3.13-4.83 6.09.01.4-.33.74-.74.74z"
                  fill=""
                />
              </svg>
              Scrapify
            </NavLink>
          </li>
        </ul>
      </div>

      <div onClick={() => logout()} className="log-out">
        <svg
          width={21}
          height={22}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.657 21.365h-.13c-4.44 0-6.58-1.75-6.95-5.67-.04-.41.26-.78.68-.82.4-.04.78.27.82.68.29 3.14 1.77 4.31 5.46 4.31h.13c4.07 0 5.51-1.44 5.51-5.51v-6.52c0-4.07-1.44-5.51-5.51-5.51h-.13c-3.71 0-5.19 1.19-5.46 4.39a.759.759 0 01-1.51-.13c.34-3.98 2.49-5.76 6.96-5.76h.13c4.91 0 7.01 2.1 7.01 7.01v6.52c0 4.91-2.1 7.01-7.01 7.01z"
            fill="#FB6B63"
          />
          <path
            d="M13.417 11.845H2.037c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11.38c.41 0 .75.34.75.75s-.34.75-.75.75z"
            fill="#FB6B63"
          />
          <path
            d="M4.267 15.195c-.19 0-.38-.07-.53-.22l-3.35-3.35a.754.754 0 010-1.06l3.35-3.35c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.82 2.82 2.82 2.82c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
            fill="#FB6B63"
          />
        </svg>
        Logout
      </div>
    </div>
  );
};

export default LeftNav;
