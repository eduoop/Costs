import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Contact from '../src/components/pages/Contact';
import Home from '../src/components/pages/Home'
import NewProject from '../src/components/pages/NewProject';
import Company from '../src/components/pages/Company';

import Container from '../src/components/layouts/Container';
import Navbar from '../src/components/layouts/Navbar';
import Footer from '../src/components/layouts/Footer';
import Projects from '../src/components/pages/Projects';
import Login from './components/pages/Login';

import { AuthProvider, AuthContext } from "./components/contexts/Auth"

function App() {

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if(loading) {
      return <div className='loading'>Carregando...</div>
    }

    if(!authenticated) {
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar/>
            <Container customClass="min_height">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/projects" element={<Projects />}></Route>
                <Route path="/newproject" element={<Private><NewProject /></Private>}></Route>
                <Route path="/company" element={<Company />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </Routes>
            </Container>
          <Footer/>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
