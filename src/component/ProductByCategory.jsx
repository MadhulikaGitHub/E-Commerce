import React, { useEffect } from 'react';
import Product from './product/Product';
import Loading from './layout/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/ProductAction';
import { useLocation } from 'react-router-dom';

function ProductByCategory() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.prod);
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory || 'All Categories';

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Filter products based on the selected category
    const filteredProducts = products.filter(product => product.category === selectedCategory);

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5 my-3">
                    <h2>PRODUCTS IN {selectedCategory.toUpperCase()}</h2>
                    <hr />
                    {
                        loading ? (
                            <Loading />
                        ) : (
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Product key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products available for the selected category.</p>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductByCategory;
