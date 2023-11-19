import axios from 'axios'
import React, { useMemo, useState } from 'react'
import imageLocal1 from '../components/img/img/img1.jpg';
import imageLocal2 from '../components/img/img/img2.jpg';
import imageLocal4 from '../components/img/img/img4.jpg';
import imageLocal7 from '../components/img/img/img7.jpg';
import imageLocal8 from '../components/img/img/img8.jpg';
import imageLocal9 from '../components/img/img/img9.jpg';
export default function HomePage() {
  const [state, setState] = useState([]);
  const [page,setPage] = useState(6)
  useMemo(async() => {
    const value = await axios.get(`http://localhost:8080/api/supply/list?p=${page}`);
    setState (value.data);
    console.log(value.data);
  },[page])
  return (
    
<div>
  <div>
 

    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src= {imageLocal7} className="d-block w-100" alt="..." height="500px" />
        </div>
        <div className="carousel-item">
          <img src= {imageLocal8} className="d-block w-100" alt="..." height="500px" />
        </div>
        <div className="carousel-item">
          <img src= {imageLocal9}  className="d-block w-100" alt="..." height="500px" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <br />
  <div className="container mt-3 mb-0">
    <div className="row">
      <div className="col-md-4 m-0">
        <h2 className="font-text-footer" style={{fontSize: 24}}>
          CÔNG TY VẬT TƯ VIỆT NAM<br />
        </h2>
      </div>
      <div className="col-md-4 m-0">
        <iframe src="https://www.youtube.com/embed/TPP28hddpq8" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{height: 300, width: 400}}>
        </iframe>
      </div>
      <div className="col-md-4 m-0">
        <p className="font-text">
          Chúng tôi cung cấp một loạt sản phẩm vật tư y tế cao cấp, từ khẩu trang y tế, thiết bị chẩn đoán, đến dụng cụ y tế và thuốc. Sản phẩm của chúng tôi đáp ứng các tiêu chuẩn chất lượng cao nhất và được kiểm tra định kỳ để đảm bảo an toàn cho bạn và gia đình.
        </p>
      </div>
    </div>
  </div>
  <br /><br />
  {/*+++++++++++++++++++++content intro+++++++++++++++++++++*/}
  <div className="container">
    <div className="row mt-3">
      <div className="col-md-6">
        <img src={imageLocal2} alt width="100%" />
      </div>
      <div className="col-md-6 px-3">
        <h2 className="font-text-footer">Băng gạc</h2>
        <p className="font-text">
          Điều quan trọng nhất trong việc bảo vệ và chăm sóc cho cơ thể của bạn là sự hỗ trợ đúng đắn. Và sản phẩm của chúng tôi - băng gạ chất lượng cao - sẽ là người bạn đồng hành lý tưởng trong mọi tình huống.
          Băng gạ của chúng tôi được thiết kế để đáp ứng mọi nhu cầu của bạn. Chúng là lựa chọn hoàn hảo cho việc bảo vệ và giữ cho các bộ phận của cơ thể an toàn và ổn định trong thời gian dài.
        </p>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6 px-3">
        <h2 className="font-text-footer">Hộp cứu thương</h2>
        <p className="font-text">
          Trong thời đại ngày nay, sự an toàn và sẵn sàng là mối quan tâm hàng đầu của mọi gia đình. Và sản phẩm hộp y tế của chúng tôi không chỉ cung cấp sự an toàn mà còn giúp bạn chuẩn bị cho mọi tình huống.
          Hộp y tế của chúng tôi được thiết kế đa dạng với nhiều kích thước và tính năng để đáp ứng mọi nhu cầu. Có đủ không gian để lưu trữ thuốc, băng gạ, dụng cụ cơ bản và thậm chí cả sách hướng dẫn cấp cứu.
        </p>
      </div>
      <div className="col-md-6">
        <img src={imageLocal1} alt width="100%" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <img src={imageLocal4} alt width="100%" />
      </div>
      <div className="col-md-6 px-3">
        <h2 className="font-text-footer">Bông gòn</h2>
        <p className="font-text">
          Bông gòn là một phần quan trọng của cuộc sống hàng ngày của chúng ta. Chúng được sử dụng trong nhiều mục đích, từ làm sạch da, vệ sinh cá nhân đến chăm sóc sức khỏe. Và chúng tôi tự hào giới thiệu sản phẩm bông gòn của chúng tôi, chất lượng và mềm mại độc đáo.
          Chúng tôi chăm sóc mỗi chi tiết, để sản phẩm bông gòn của chúng tôi đem lại trải nghiệm tuyệt vời. Dùng nó để loại bỏ bụi, trang điểm, chăm sóc da, hoặc trong mọi tình huống cần sự mềm mại và sạch sẽ.
        </p>
      </div>
    </div>
  </div>
  <br /><br /><br /><br />
</div>
)}