import './App.css';
import { Route, Routes } from 'react-router';
import Home from './Components/home/Home.jsx';
import Error from './Components/error/Error.jsx';
import Login from './Components/auth/Login.jsx';
import AddBlog from './page/AddBlog.jsx';
import FeaturedBlogs from './page/FeaturedBlogs.jsx';
import Allblogs from './page/Allblogs.jsx';
import Wishlist from './page/Wishlist.jsx';
import Registration from './Components/auth/Registration.jsx';
import AuthProvider from './Components/auth/AuthProvider/AuthProvider.jsx';
import About from './page/About.jsx';
import { ToastContainer } from 'react-toastify';
import Privaterout from './Components/Rout/Privaterout.jsx';
import Details from './page/dynamic-page/Details.jsx';
import Update from './page/dynamic-page/Update.jsx';
import Dashboard from './page/Dashboard.jsx';


function App() {
  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-white'>
      <AuthProvider >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allblogs" element={<Allblogs />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/featuredblogs" element={<FeaturedBlogs />} />
          <Route path="/addblog" element={<Privaterout><AddBlog/></Privaterout>} />
          <Route path="/update/:id" element={<Privaterout><Update/></Privaterout>} />
          <Route path="/wishlist" element={<Privaterout><Wishlist /></Privaterout>} />
          <Route path="/dashboard" element={<Privaterout><Dashboard /></Privaterout>} />
          <Route path="/allblogs/:id" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </div>
  );
}

export default App;
