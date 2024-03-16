import React from 'react'
import { Link } from 'react-router-dom'
import { getCount, increaseCount } from '../features/posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'


const Header = () => {
  const dispatch = useDispatch()
  const count = useSelector(getCount)
  return (
    <header>
        <h1>Redux Social Media</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="user">Users</Link></li>
                <button
                type="button"
                onClick={()=>dispatch(increaseCount())}
                >
                  {count}
                </button>
            </ul>
        </nav>
    </header>
  )
}

export default Header
