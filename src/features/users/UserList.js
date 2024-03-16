import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllusers } from './usersSlice'
import { Link } from 'react-router-dom'


const UserList = () => {
    const users = useSelector(selectAllusers)
    const allUser = users.map(user=>(
        <li key={user.id}>
            <Link to={`/user/${user.id}`}  style={{textDecoration:"none", color:"black"}}> {user.name}</Link>
        </li>
    ))


  return (
  <section className='section'>
    <h2 style={{color:"rgb(5, 12, 119", listStyle:"none"}}>Users</h2>
    <ul style={{ listStyle:"none"}}>
    {allUser}
    </ul>
  </section>
  )
}

export default UserList
