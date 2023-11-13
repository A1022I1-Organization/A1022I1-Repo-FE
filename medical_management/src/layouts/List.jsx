import axios from 'axios'
import React, { useMemo, useState } from 'react'

export default function List() {
  const [state, setState] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page,setPage] = useState(6)
  const [condition,setCondition] = useState("")
  useMemo(async() => {
    console.log(condition)
    const value = await axios.get(`http://localhost:8080/api/supply/list?c=${condition}&p=${page}`);
    setState (value.data);
   
  },[page,condition])
  useMemo(async() => {
    const value = await axios.get(`http://localhost:8080/api/supply/getCategory`);
    setCategories (value.data); 
   
  },[])
  return (
    <div className="container">
    <div className="row">
        
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar px-2">
            <div className="position-sticky">
                <h3>Sản phẩm</h3>       
                <div className="accordion" id="accordionCategory2">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingCategory2">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory2" aria-expanded="true" aria-controls="collapseCategory2" onClick={() => setCondition("")}>
                                Tất cả sản phẩm
                            </button>
                        </h2>
                        <div id="collapseCategory2" className="accordion-collapse collapse show" aria-labelledby="headingCategory2" data-bs-parent="#accordionCategory2">
                            <div className="accordion-body">
                                <ul className="nav flex-column">
                                   
                                    {categories.map(item =>   <li className="nav-item">
                                        <p onClick={() => setCondition(item.id)}>{item.name}</p>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>


       
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container" id="product-container">
                <div className="row">
                    {state?
                        state.map(item =>  <div className="col-md-4">
                        <div className="card mb-4">
                            <img src={item.picture} className="card-img-top" alt="Ảnh 1" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Giá: {item.price}</p>
                            </div>
                        </div>
                    </div>) : "Hiện Tại Không có sản phẩm"
                    }
                {
                    page <= 6 ? <button onClick={() => setPage(prev => prev += 4)}> xem them ... </button> : 
                    <div>
                         <button onClick={() => setPage(prev => prev -= 4)}> rut gon ... </button>
                         <button onClick={() => setPage(prev => prev += 4)}> xem them ... </button>
                        </div>
                }
                </div>
            </div>
        </main>
    </div>
</div>
  )
}
