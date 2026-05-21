import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Flood Insurance App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;