import React from 'react'

function Customer() {

    const fetchData = async (page, limit) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/fetch?page=${currentPage}&limit=${itemsPerPage}&name=${searchQuery}`);
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
    
    return (
        <div className='main'>
            <div className='body_container'>
                <div className='row'>
                    <div className='col-8'>
                        <h2>Customers</h2>
                    </div>
                    <div className='col-4'>
                        <div className='d-flex'>
                            <div>
                                <input
                                    className='search'
                                    placeholder='search name'
                                />
                            </div>
                            <div>
                                <button className='add-btn'>ADD</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='table-container-style'>
                    <table className='table' >
                        <thead >
                            <tr >
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>jhgf</td>
                                <td>jhgf</td>
                                <td>jhgf</td>
                                <td>jhgf</td>
                            </tr>
                        </tbody>
                    </table>
                </div>



            </div>

        </div>
    )
}

export default Customer
