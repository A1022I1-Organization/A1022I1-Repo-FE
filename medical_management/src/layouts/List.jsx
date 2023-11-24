import axios from 'axios'
import React, { useMemo, useState } from 'react'

import "../components/css/HomePage.css"
import "../components/bootsrap/searchHomePage"

export default function List() {
  const [state, setState] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page,setPage] = useState(6);
  const [condition,setCondition] = useState("");
  const [nameSort,setNameSort] = useState(true);
  const [priceSort,setPriceSort] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");


  useMemo(async() => {  
    console.log(`http://localhost:8080/api/supply/list?c=${condition}&p=${page}&ns=${nameSort?"asc":"desc"}&ps=${priceSort?"asc":"desc"}`);
    const value = await axios.get(`http://localhost:8080/api/supply/list?c=${condition}&p=${page}&ns=${nameSort?"asc":"desc"}&ps=${priceSort?"asc":"desc"}`); 
    setState (value.data); 
  },[page,condition,nameSort,priceSort]);
  useMemo(async() => {
    const value = await axios.get(`http://localhost:8080/api/supply/getCategory`);
    setCategories (value.data); 
   
  },[]);
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/supply/list');
      setState(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Xử lý lỗi nếu cần thiết
    }
  };
  const handleSearch = () => {
    if (searchTerm === '') {
        fetchAllProducts();
        return;
      }
    // Lọc dữ liệu dựa trên cụm từ tìm kiếm trong item.name (không phân biệt chữ hoa và thường)
        const filteredData = state.filter(item => item.name.includes(searchTerm));
        setState(filteredData);
  };
  const setConditionAndUpdateCategory = (categoryId) => {
    setCondition(categoryId);
    setSelectedCategory(categoryId);
  };
  const handleCollapseButtonClick = () => {
    setCondition("");
    setSelectedCategory("");
  };
  
 
  return (
<div className="container" id='row21'>
    <div className="row" >
        <nav id="sidebar21" className="col-md-3 col-lg-2 d-md-block bg-light sidebar px-2">
            <div className="position-sticky">
                <h3>Sản phẩm</h3>       
                <div className="accordion" id="accordionCategory2">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingCategory2">
                            <button className={`accordion-button ${!selectedCategory ? 'active' : ''}`}  type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory2" aria-expanded="true" aria-controls="collapseCategory2" onClick={handleCollapseButtonClick}>
                                Tất cả sản phẩm
                            </button>
                        </h2>
                        <div id="collapseCategory2" className="accordion-collapse collapse show" aria-labelledby="headingCategory2" data-bs-parent="#accordionCategory2">
                            <div className="accordion-body">
                                <ul className="nav flex-column" >
                                   
                                    {categories.map(item =>   <li  className={`btn btn-lightyellow ${selectedCategory === item.id ? 'active' : ''}`} key={`nav${item.id}`} id='nav21'>
                                        <p onClick={() => setConditionAndUpdateCategory(item.id)}>{item.name}</p>
                                    </li>)}
                                    
                                    {/* {categories.map(item => (
                                            <li  id='nav21'
                                            key={`nav${item.id}`}
                                            className={`btn btn-white ${setCondition === item.id ? 'active' : ''}`}
                                            >
                                                <p onClick={() => setCondition(item.id)}>{item.name}</p>
                                            </li>
                                    ))} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>


       
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="row mb-3">
                <div className="col-md-6">
                    
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Tìm kiếm theo tên" id="searchInput" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}/>
                        <button className="btn btn-outline-success" type="button" id="searchButton" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="sortByName">Sắp xếp theo tên:</label>
                            <select className="form-select" id="sortByName" onChange={() => setNameSort(!nameSort)}>
                                <option value="az">A-Z</option>
                                <option value="za">Z-A</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="sortByPrice">Sắp xếp theo giá:</label>
                            <select className="form-select" id="sortByPrice" onChange={() => setPriceSort(!priceSort)}> 
                                <option value="lowToHigh">Giá từ thấp đến cao</option>
                                <option value="highToLow">Giá từ cao đến thấp</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" id="product-container">
                <div className="row">
                    {state?
                        state.map(item =>  <div className="col-md-4">
                        <div className="card mb-4" id='cardmb4' style={{ width: '20rem' }}>
                            <div id='div21'>
                            <img src={item.picture} className="card-img-top" alt="Ảnh 1" />
                            </div>
                            <div className="card-body" id='cardbody' style={{ height: '8rem' }}>
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Giá: {item.price}</p>
                            </div>
                        </div>
                    </div>) : <h1 id='error21'>Hiện Tại Không có sản phẩm</h1> 
                    }
                {
                    state ?
                    page <= 6 ? 
                    <div>
                    <button class="btn btn-primary" onClick={() => setPage(prev => prev += 4)}> Xem Thêm ... </button>
                    </div>
                     : 
                    <div>
                         <button class="btn btn-secondary" onClick={() => setPage(prev => prev -= 4)}> Rút gọn ... </button>
                         <button class="btn btn-primary" onClick={() => setPage(prev => prev += 4)}> Xem Thêm ... </button>
                        </div>
                    : <div></div>
                }
                </div>
            </div>
        </main>
    </div>
</div>
  )
}
