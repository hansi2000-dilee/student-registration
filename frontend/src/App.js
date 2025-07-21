import React, { useState } from 'react';
import { Container, Button, Carousel } from 'react-bootstrap';
import RegisterModal from './components/RegisterModal';
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section text-center text-white">
        <Container>
          <img src={logo} alt="Institute Logo" className="logo mb-2" />
          <h1 className="display-5 fw-bold">Welcome to Siyathra Institute</h1>
         
        </Container>
      </header>

      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/bg1.webp" alt="Slide 1" />
            <Carousel.Caption>
              <h3>Smart Learning Environment</h3>
              <p>Modern tools and resources to support student success.</p>
               <Button variant="light" size="lg" onClick={() => setModalShow(true)}>
            Register Now
          </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/bg2.jpg" alt="Slide 2" />
            <Carousel.Caption>
              <h3>Expert Faculty</h3>
              <p>Learn from experienced educators and industry professionals.</p>
               <Button variant="light" size="lg" onClick={() => setModalShow(true)}>
            Register Now
          </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="/assets/bg3.jpg" alt="Slide 3" />
            <Carousel.Caption>
              <h3>Career-Focused Programs</h3>
              <p>Tailored programs to guide your professional journey.</p>
               <Button variant="light" size="lg" onClick={() => setModalShow(true)}>
            Register Now
          </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Modal */}
      <RegisterModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
