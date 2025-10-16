import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaSearch, FaChartBar, FaCog } from 'react-icons/fa';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3>{isCollapsed ? 'G' : 'G-Scores'}</h3>
      </div>
      <ul className="menu-items">
        <li>
          <NavLink to="/" className="menu-item">
            <FaTachometerAlt className="menu-icon" />
            {!isCollapsed && <span className="menu-text">Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className="menu-item">
            <FaChartBar className="menu-icon" />
            {!isCollapsed && <span className="menu-text">Reports</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;