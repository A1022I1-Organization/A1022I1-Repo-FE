export const Footer = () => {
    return (
    <>
        <footer className="bg-light py-4">
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <h5>Company Name</h5>
        <p>Tên Công Ty</p>
      </div>
      <div className="col-md-3">
        <h5>Product</h5>
        <ul>
          <li><a href="#">Sản phẩm 1</a></li>
          <li><a href="#">Sản phẩm 2</a></li>
          <li><a href="#">Sản phẩm 3</a></li>
        </ul>
      </div>
      <div className="col-md-3">
        <h5>Useful Links</h5>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </div>
      <div className="col-md-3">
        <h5>Contact</h5>
        <ul>
          <li>
            <i className="fas fa-home" /> Địa chỉ: 123 Đường ABC, TP XYZ
          </li>
          <li>
            <i className="fas fa-envelope" /> Email: <a href="mailto:example@example.com">example@example.com</a>
          </li>
          <li>
            <i className="fas fa-phone" /> Số điện thoại: <a href="tel:+1234567890">(123) 456-7890</a>
          </li>
          <li>
            <i className="fab fa-facebook" /> <a href="https://www.facebook.com/">Facebook</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    </>

    )
}