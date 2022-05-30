import React from 'react';
import Sidebar from './Components/Sidebar';

function PageRouters({ children, ProfileData }) {
  return (
    <div className="sidebarmain">
      <div className="mside">
        <Sidebar ProfileData={ProfileData} />
      </div>
      <div className="dashboardmain">{children}</div>
    </div>
  );
}

export default PageRouters;
