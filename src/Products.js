import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Prods() {
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(d);

  useEffect(() => {
    let componentMounted = true;
    const getProds = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      if (componentMounted) {
        const data = await response.json();
        setD(data);
        setFilter(data);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProds();
  }, []);

  const Load = () => {
    return (
      <>
        <div className="col-md-3 my-3">
          <div className="position-sticky" style={{ top: "100px" }}>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => setFilter(d)}>All</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("jewelry")}>Jewelry</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("electronics")}>Electronics</button>
          </div>
        </div>
      </>
    );
  };

  const filterProduct = (category) => {
    const updateList = d.filter((x) => x.category === category);
    setFilter(updateList);
  };

  const ShowProds = () => {
    return (
      <>
        <div className="col-md-3 my-3">
          <div className="position-sticky" style={{ top: "100px" }}>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => setFilter(d)}>All</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("jewelry")}>Jewelry</button>
            <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("electronics")}>Electronics</button>
          </div>
        </div>

        <div className="col-md-9 py-md-3">
          <div className="row">
            {filter.map((prod) => {
              return (
                <div className="col-6 col-md-6 col-lg-4 mb-3" key={prod.id}>
                  <div className="card h-100">
                    <img src={prod.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={prod.title} />
                    <div className="m-3 mb-0">
                      <small className="card-title">{prod.title.substring(0, 50)}...</small>
                    </div>
                    <div style={{ marginTop: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="m-3"><b>${prod.price}</b></div>
                        <NavLink className="stretched-link" to={`/product/${prod.id}`}>
                          <button className="btn btn-sm m-3 border-primary">
                            <i className="fa fa-arrow-right text-muted"></i>
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? <Load /> : <ShowProds />}
      </div>
    </div>
  );
}

export default Prods;
