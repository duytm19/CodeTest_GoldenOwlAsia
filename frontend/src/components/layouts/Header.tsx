import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="header-title">G-Scores</div>
    </header>
  );
};

export default Header;