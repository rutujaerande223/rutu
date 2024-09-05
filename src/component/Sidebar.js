import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div>
      <ul className="list-unstyled pt-3">
        {/* <li className="list-item">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? 'text-decoration active-link' : 'text-decoration'
            }
          >
            Home
          </NavLink>
        </li> */}
        <li className="list-item pt-3">
          <NavLink
            to="/users"
            className={({ isActive }) => 
              isActive ? 'text-decoration active-link' : 'text-decoration'
            }
          >
            Users
          </NavLink>
        </li>
        {/* <li className="list-item pt-3">
          <NavLink
            to="/Customer"
            className={({ isActive }) => 
              isActive ? 'text-decoration active-link' : 'text-decoration'
            }
          >
            Customer
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
