import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, addUser } from "./redux/userSlice";

function Users() {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilenum, setmobilenum] = useState("");
    const [errors, setErrors] = useState({});

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:3001/deleteuser/" + id)
            .then((res) => {
                dispatch(deleteUser({ id }));
            })
            .catch((err) => console.log(err));
    };

    const validate = () => {
        let errors = {};
        if (!name) errors.name = "Name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
        }
        if (!mobilenum) {
            errors.mobilenum = "mobilenum is required";
        } else if (isNaN(mobilenum) || mobilenum < 1) {
            errors.mobilenum = "mobilenum must be a valid number greater than 0";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            axios
                .post("http://localhost:3001/create", { name, email, mobilenum })
                .then((res) => {
                    dispatch(addUser(res.data));
                    setName(""); // Reset form
                    setEmail("");
                    setmobilenum("");
                    setErrors({});
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="mobilenum">mobile  No.</label>
                        <input
                            type="text"
                            id="mobilenum"
                            placeholder="Enter mobilenum"
                            className="form-control"
                            value={mobilenum}
                            onChange={(e) => setmobilenum(e.target.value)}
                        />
                        {errors.mobilenum && <small className="text-danger">{errors.mobilenum}</small>}
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
                <hr></hr>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>mobile no.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobilenum}</td>
                                <td>
                                    <Link
                                        to={`/edit/${user.id}`}
                                        className="btn btn-sm btn-success me-2"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
