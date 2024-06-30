import axios from "axios";
import { useEffect, useState } from "react";
import { addUser, updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const {id} = useParams()
   
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobilenum, setmobilenum] = useState()
    
    const users = useSelector(state => state.users.users)
    
    useEffect(()=> {
        const user = users.find(u => u.id === id)
        setName(user.name)
        setEmail(user.email)
        setmobilenum(user.mobilenum)
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/update/'+id, {name, email, mobilenum})
        .then(res => {
            dispatch(updateUser({id, name, email, mobilenum}))
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">mobilenum</label>
            <input
              type="text"
              placeholder="Enter mobilenum"
              className="form-control"
              value={mobilenum}
              onChange={(e) => setmobilenum(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
     );
}

export default UpdateUser;