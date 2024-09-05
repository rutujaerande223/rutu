import React, { useEffect, useState } from 'react';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ReactPaginate from 'react-paginate';
import './User.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openUpdateCustomer, setOpenUpdateCustomer] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [select, setSelect] = useState(null);

  const handleClose = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleCloseCustomer = () => {
    setOpenUpdateCustomer(!openUpdateCustomer);
  };

  // Fetch Data from API
  const fetchData = async (page, limit) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/fetch?page=${page}&limit=${limit}&name=${searchQuery}`
      );
      const result = await response.json();
      if (response.ok) {
        setData(result.users);
        setTotalPages(result.totalPages);
      } else {
        console.error('Error fetching data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [searchQuery, currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  // Handle Delete User
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        fetchData(currentPage, itemsPerPage);
      } else {
        console.error('Failed to delete user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onPageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handlePaginationLimitChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); 
  };

  const handleEdit = (user) => {
    setSelect(user);
    setOpenUpdateCustomer(!openUpdateCustomer);
  };

  return (
    <div className="main">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="#F5F5FC"
        toastStyle={{ color: 'black', background: 'white', fontWeight: 500 }}
      />
      <div className="body_container">
        <div className="row">
          <div className="col-8">
            <h2>Users</h2>
          </div>
          <div className="col-4">
            <div className="d-flex">
                {console.log(searchQuery,"oiuytrf")
                }
              <input
                value={searchQuery}
                className="search"
                placeholder="search name"
                onChange={handleSearch}
              />
              <button className="add-btn" onClick={handleClose}>ADD</button>
              {openSidebar && (
                <AddUser
                  handleClose={handleClose}
                  fetchData={fetchData}
                  setOpenSidebar={setOpenSidebar}
                />
              )}
            </div>
          </div>
        </div>
        <div className="table-container-style">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{'•'.repeat(user.password.length)}</td>
                    <td>{user.age}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                      {openUpdateCustomer && select && (
                        <EditUser
                          handleCloseCustomer={handleCloseCustomer}
                          select={select}
                          fetchData={fetchData}
                        />
                      )}
                      <button className="delete" onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data.length > 0 && (
          <div className="d-inline-flex">
            <div className="col-4">
              <select
                className="pagination ml-3 pagination-limitdropdown select-dropdown"
                value={itemsPerPage}
                onChange={handlePaginationLimitChange}
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={150}>150</option>
              </select>
            </div>
            <div className="col-6 ml-5">
              <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                breakLabel="..."
                pageCount={totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={onPageChange}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                forcePage={currentPage - 1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTable;

