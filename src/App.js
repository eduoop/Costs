import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Contact from '../src/components/pages/Contact';
import Home from '../src/components/pages/Home'
import NewProject from '../src/components/pages/NewProject';
import Company from '../src/components/pages/Company';

import Container from '../src/components/layouts/Container';
import Navbar from '../src/components/layouts/Navbar';
import Footer from '../src/components/layouts/Footer';
import Projects from '../src/components/pages/Projects';
import Login from './components/pages/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Container customClass="min_height">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/newproject" element={<NewProject />}></Route>
            <Route path="/company" element={<Company />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </>
  )
}

export default App;
