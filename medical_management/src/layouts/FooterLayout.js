import imageLocal7 from '../components/img/img/img7.jpg';
import imageLocal10 from '../components/img/img/img10.jpg';
import { NavLink } from 'react-router-dom';

export const Footer = ({ categories }) => {


  return (
    <>
     {/* Footer */}
<footer  className="text-center text-lg-start bg-white text-muted">
  {/* Section: Social media */}
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    {/* Left */}
    <div className="me-5 d-none d-lg-block">
      <span></span>
    </div>
    {/* Left */}
    {/* Right */}
    <div>
      {/* Facebook */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#3b5998'}} href="https://www.facebook.com" role="button"><i className="fab fa-facebook-f" /></a>
      {/* Twitter */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#55acee'}} href="https://twitter.com/home" role="button"><i className="fab fa-twitter" /></a>
      {/* Google */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#dd4b39'}} href="https://cpt-medical.com/" role="button"><i className="fab fa-google" /></a>
      {/* Instagram */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#ac2bac'}} href="https://www.instagram.com/" role="button"><i className="fab fa-instagram" /></a>
      {/* Linkedin */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#0082ca'}} href="https://www.linkedin.com/" role="button"><i className="fab fa-linkedin-in" /></a>
      {/* Github */}
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#333333'}} href="https://github.com/A1022I1-Organization" role="button"><i className="fab fa-github" /></a>
    </div>
    {/* Right */}
  </section>
  {/* Section: Social media */}
  {/* Section: Links  */}
  <div id='myFooter'>
  <section className >
    <div  className="container text-center text-md-start mt-5">
      {/* Grid row */}
      <div className="row mt-3">
        {/* Grid column */}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          {/* Content */}
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3 text-secondary" />Công ty Vật tư y tế Việt Nam
          </h6>
          <img src= {imageLocal10} className="d-block w-100" alt="..." height="100px" />
          <p>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <NavLink to="/list" className="text-uppercase fw-bold mb-4" activeClassName="active">
            Sản phẩm 
          </NavLink>

        
          <img src= {imageLocal7} className="d-block w-100" alt="..." height="100px" />
          
        </div>
        {/* Grid column */}
        {/* Grid column */}
        {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
         
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div> */}
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">Địa Chỉ</h6>
          <p><i className="fas fa-home me-3 text-secondary" /> 280 Đ. Trần Hưng Đạo, An Hải Tây, Sơn Trà, Đà Nẵng 550000</p>
          <p>
            <i className="fas fa-envelope me-3 text-secondary" />
            info@example.com
          </p>
          <p><i className="fas fa-phone me-3 text-secondary" /> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3 text-secondary" /> + 01 234 567 89</p>
        </div>
        {/* Grid column */}
      </div>
      {/* Grid row */}
    </div>
  </section>
  {/* Section: Links  */}
  </div>
</footer>
{/* Footer */}

    </>
  );
};
