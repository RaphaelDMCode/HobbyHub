// ---[Defines all Pages and Routes]--- //
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import IntroPage from './pages/IntroPage'
import PostFeed from './pages/PostFeed'
import UserPost from './pages/UserPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'
import './App.css'

function App() {
  const navigate = useNavigate();

  const isLoggedIn = () => !!localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  }
  
  return (
      <div className='App'>

        {/* ---[Navbar Section]--- */}
        <nav className='Navbar'>
          <h1>BookVerse Hub</h1>
          <div>
            <Link to="/">Home</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/create">Create</Link>
            <Link to="/user-posts">Your Post</Link>

            {/* Log In or Log Out */}
            {isLoggedIn() && (
              <button onClick={handleLogout} className='logout-Btn'>Logout</button>
            )}
          </div>
        </nav>

        {/* ---[Routes Section]--- */}
        <Routes>

          {/* Is the User has a Username, Directs to IntroPage.jsx, if not, diretcs to LoginPage.jsx */}
          <Route path='/' element={isLoggedIn() ? <IntroPage /> : <Navigate to='/login' />} />

          {/* Login Page */}
          <Route path='/login' element={<LoginPage />} />

          {/* Post Feed */}
          <Route path='/feed' element={isLoggedIn() ? <PostFeed /> : <Navigate to='/login' />} />

          {/* User Posts */}
          <Route path='/user-posts' element={isLoggedIn() ? <UserPost /> : <Navigate to='/login' />} />

          {/* Create Posts */}
          <Route path='/create' element={isLoggedIn() ? <CreatePost /> : <Navigate to='/login' />} />

          {/* Edit Posts */}
          <Route path='/edit/:id' element={isLoggedIn() ? <EditPost /> : <Navigate to='/login' />} />

          {/* Post Details */}
          <Route path='/posts/:id' element={isLoggedIn() ? <PostDetails /> : <Navigate to='/login' />} />

        </Routes>
        
      </div>
  )
}

export default App;