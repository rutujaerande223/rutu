import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser({ handleClose, setOpenSidebar, fetchData }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic moved into handleSubmit
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) validationErrors.name = 'Name is required';
        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (!password) validationErrors.password = 'Password is required';
        if (password && password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
        if (!age) validationErrors.age = 'Age is required';
        else if (isNaN(age)) validationErrors.age = 'Age must be a number';

        setErrors(validationErrors);

        // Check if there are any validation errors
        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);

        const data = {
            name,
            email,
            password,
            age,
        };

        // POST API CALL
        fetch('http://localhost:5000/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                setOpenSidebar(false);
                toast.success('User added successfully!');
                fetchData();
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('An error occurred while adding the user');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCancel = () => {
        setName("");
        setEmail("");
        setPassword('');
        setAge('');
    }

    return (
        <div className="sidepage">
            <div className="m-4">
                <div className="">
                    <h6 className="d-flex fontw-400">
                        <b className="font16">Add user information</b>
                        <i className="fa-sharp fa-solid fa-circle-xmark" onClick={handleClose}></i>
                    </h6>
                    <hr />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>

                        <input
                            className={`${errors.name ? "error-border" : ''}`}
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}

                        <label className="">Email:</label>

                        <input
                            className={`${errors.email ? "error-border" : ''}`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}

                        <label className="">Password:</label>

                        <div className="position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={` ${errors.password ? "error-border" : ''}`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
                                style={{
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}


                        <label className="">Age:</label>

                        <input
                            className={`${errors.age ? "error-border" : ''}`}
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </div>

                    <div className=" d-flex buttons ">
                        <div>
                            <button className="btn btn-secondary"
                                style={{ width: "100px" }}
                                type="submit"
                                disabled={isLoading}>

                                {isLoading ? (
                                    <i className="spinner-border spinner-border-sm spin"></i>
                                ) : (
                                    <b>Submit</b>
                                )}
                            </button>
                        </div>
                        <div className=''>
                            <button className="btn" style={{
                                border: "1px solid black",
                                marginLeft: "10px"
                            }} onClick={handleCancel}
                                type='button'>
                                <b>Cancel</b>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddUser;
