import React, { useState } from 'react';

function EditUser({ handleCloseCustomer, select, fetchData }) {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: select?.name || '',
        email: select?.email || '',
        password: select?.password || '',
        age: select?.age || '',
    });

    const [showPassword, setShowPassword] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `http://localhost:5000/api/user/update/${select._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data updated successfully:', data);

            handleCloseCustomer();
            fetchData();
            setIsLoading(false)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="sidepage">
            <div className="m-4">
                <div className="">
                    <h6 className="d-flex fontw-400">
                        <b className="font16">Edit user information</b>
                        <i
                            className="fa-sharp fa-solid fa-circle-xmark"
                            onClick={handleCloseCustomer}
                        ></i>
                    </h6>
                    <hr></hr>
                </div>

                <div>
                    <label>Name:</label>
                    <br />
                    <input
                        className="mt-2"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label className="mt-3">Email:</label>
                    <br />
                    <input
                        className="mt-2"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label className="mt-3">Password:</label>
                    <br />
                    <div className="position-relative mt-2">
                        <input
                            className=""
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <i
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
                            style={{
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        ></i>
                    </div>
                    <label className="mt-3">Age:</label>
                    <br />
                    <input
                        className="mt-2"
                        placeholder="Enter your age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                {/* <button
                    className="btn btn-secondary mt-5 buttons"
                    onClick={handleUpdate}
                >
                    Update
                </button> */}
                <button
                    className="btn btn-secondary buttons"
                    style={{ width: '100px' }}
                    onClick={handleUpdate}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <i className="spinner-border spinner-border-sm spin"></i>
                    ) : (
                        <b>Update</b>
                    )}
                </button>
            </div>
        </div>
    );
}

export default EditUser;
