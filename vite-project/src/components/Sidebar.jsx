import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Bootstrap Button
// import toast, { Toaster } from 'react-hot-toast';

function Rsidebar() {
  const [dateTime, setDateTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const day = now.toLocaleString('en-US', { weekday: 'long' });
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setDateTime(`${day} : ${date} : ${time}`);
    });

    return () => clearInterval(interval);
  }, []);

  const showToast = (linkName) => {
    // toast.success(`This is your ${linkName}`);
    alert(`This is your ${linkName}`); // Using alert for demonstration
  };

  return (
    <div className="d-flex">
      {/* Toggle button for small screens */}
      {/* <Button
        className="d-md-none m-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Toggle Sidebar
      </Button> */}

      {/* Sidebar - will be responsive based on screen size */}
      <div
        className={`d-none d-md-block ${isSidebarOpen ? 'd-block' : ''}`} // Responsive classes
        style={{ width: '250px', height: '100vh' }}
      >
        <Sidebar className='shadow border rounded' style={{ height: '94vh' }}>
          <Menu>
            <Link to="/addnotes" onClick={() => showToast('Add Notes')}>
              <MenuItem active={true}> Add Notes </MenuItem>
            </Link>

            <Link to="/" onClick={() => showToast('My Notes')}>
              <MenuItem> My Notes </MenuItem>
            </Link>

            <Link to="/recyclebin" onClick={() => showToast('Recycle Bin')}>
              <MenuItem> Recycle Bin </MenuItem>
            </Link>
          </Menu>

          <div className="p-3 text-center" style={{ marginTop: "30vh" }}>
            <strong>{dateTime}</strong>
          </div>
        </Sidebar>
      </div>

      {/* Main content */}
      {/* <div className="flex-grow-1 p-3">
        {/* Content of the main page goes here */}
        {/* <h2>Welcome to the Notes Application</h2> */}
      {/* </div>  */}
          </div>
  );
}

export default Rsidebar;
