// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { MDBDataTable } from 'mdbreact';
// import Sidebar from './Sidebar';
// import Loading from '../layout/Loading';
// import MetaData from '../layout/MetaData';
// import { useAlert } from 'react-alert';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts, deleteProduct } from '../../redux/actions/ProductAction';
// import { clearErrors } from '../../redux/actions/UserAction';

// function ProductsList() {
//     const alert = useAlert();
//     const dispatch = useDispatch();

//     const { loading, error, products } = useSelector(state => state.prod);

//     useEffect(() => {
//         dispatch(getProducts());
//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors());
//         }
//     }, [dispatch, alert, error]);

//     const deleteProductHandler = async (id) => {
//         await dispatch(deleteProduct(id));
//         alert.success('Product deleted successfully');
//         dispatch(getProducts());  // Re-fetch the updated products list
//     };

//     const setProduct = () => {
//         const data = {
//             columns: [
//                 {
//                     label: 'Id',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Name',
//                     field: 'name',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Price',
//                     field: 'price',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Stock',
//                     field: 'stock',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Image',
//                     field: 'image',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Actions',
//                     field: 'actions',
//                 },
//             ],
//             rows: []
//         };

//         products.forEach(product => {
//             data.rows.push({
//                 id: product._id,
//                 name: product.name,
//                 price: `Rs:${product.price}`,
//                 stock: `${product.stock}`, // Corrected format
//                 image: (
//                     product.images && product.images.url ?
//                         <img src={product.images.url} width={'100'} alt='product-image' /> :
//                         <span>No Image</span>
//                 ),
//                 actions: (
//                     <>
//                         <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
//                             <i className="fa fa-pencil"></i>
//                         </Link>
//                         <button
//                             className="btn btn-danger py-1 px-2 ml-2"
//                             onClick={() => deleteProductHandler(product._id)}>
                            
//                             <i className="fa fa-trash"></i>
//                         </button>
//                     </>
//                 )
//             });
//         });

//         return data;
//     };

//     return (
//         <>
//             <MetaData title={'Products'} />
//             <div className="row">
//                 <div className="col-12 col-md-2">
//                     <Sidebar />
//                 </div>
//                 <div className="col-12 col-md-10">
//                     <h1 className="my-5">All Products</h1>
//                     {loading ? <Loading /> : (
//                         <MDBDataTable
//                             data={setProduct()}
//                             className='px-3'
//                             bordered
//                             striped
//                             hover
//                         />
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ProductsList;

//============================================================================

// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { MDBDataTable } from 'mdbreact';
// import Sidebar from './Sidebar';
// import Loading from '../layout/Loading';
// import MetaData from '../layout/MetaData';
// import { useAlert } from 'react-alert';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts, deleteProduct, updateProduct, clearErrors } from '../../redux/actions/ProductAction';

// function ProductsList() {
//   const alert = useAlert();
//   const dispatch = useDispatch();

//   const { loading, error, products } = useSelector(state => state.prod);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [stock, setStock] = useState('');
//   const [rating, setRating] = useState('');
//   const [category, setCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const updateProductModalRef = useRef(null);

//   useEffect(() => {
//     dispatch(getProducts());
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, alert, error]);

//   const deleteProductHandler = async (id) => {
//     await dispatch(deleteProduct(id));
//     alert.success('Product deleted successfully');
//     dispatch(getProducts());  // Re-fetch the updated products list
//   };

//   const handleUpdateClick = (product) => {
//     setSelectedProduct(product);
//     setName(product.name);
//     setDescription(product.description);
//     setPrice(product.price);
//     setStock(product.stock);
//     setRating(product.rating);
//     setCategory(product.category);
//     setImage(product.images?.url || '');
//     setModalVisible(true);
//   };

//   const handleProductUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('stock', stock);
//     formData.append('rating', rating);
//     formData.append('category', category);
//     if (image) {
//       formData.append('images', image);
//     }

//     try {
//       await dispatch(updateProduct(selectedProduct._id, formData));
//       alert.success('Product updated successfully');
//       setModalVisible(false);
//       dispatch(getProducts());
//     } catch (error) {
//       console.error('Product update failed', error);
//     }
//   };

//   const setProduct = () => {
//     const data = {
//       columns: [
//         { label: 'Id', field: 'id', sort: 'asc' },
//         { label: 'Name', field: 'name', sort: 'asc' },
//         { label: 'Price', field: 'price', sort: 'asc' },
//         { label: 'Stock', field: 'stock', sort: 'asc' },
//         { label: 'Image', field: 'image', sort: 'asc' },
//         { label: 'Actions', field: 'actions' },
//       ],
//       rows: []
//     };

//     products.forEach(product => {
//       data.rows.push({
//         id: product._id,
//         name: product.name,
//         price: `Rs:${product.price}`,
//         stock: product.stock,
//         image: (
//           product.images && product.images.url ?
//             <img src={product.images.url} width={'100'} alt='product-image' /> :
//             <span>No Image</span>
//         ),
//         actions: (
//           <>
//             <button
//               className="btn btn-primary py-1 px-2"
//               onClick={() => handleUpdateClick(product)}
//             >
//               <i className="fa fa-pencil"></i>
//             </button>
//             <button
//               className="btn btn-danger py-1 px-2 ml-2"
//               onClick={() => deleteProductHandler(product._id)}
//             >
//               <i className="fa fa-trash"></i>
//             </button>
//           </>
//         )
//       });
//     });

//     return data;
//   };

//   return (
//     <>
//       <MetaData title={'Products'} />
//       <div className="row">
//         <div className="col-12 col-md-2">
//           <Sidebar />
//         </div>
//         <div className="col-12 col-md-10">
//           <h1 className="my-5">All Products</h1>
//           {loading ? <Loading /> : (
//             <MDBDataTable
//               data={setProduct()}
//               className='px-3'
//               bordered
//               striped
//               hover
//             />
//           )}
//         </div>
//       </div>

//       {/* Update Product Modal */}
//       {modalVisible && (
//         <div className="modal fade show" style={{ display: 'block' }} ref={updateProductModalRef}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleProductUpdate}>
//                   <div className="mb-3">
//                     <label htmlFor="name">Name</label>
//                     <input type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       name="name"
//                       className="form-control" />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="description">Description</label>
//                     <textarea
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       name="description"
//                       className="form-control"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="price">Price</label>
//                     <input type="number"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       name="price"
//                       className="form-control" />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="stock">Stock</label>
//                     <input type="number"
//                       value={stock}
//                       onChange={(e) => setStock(e.target.value)}
//                       name="stock"
//                       className="form-control" />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="rating">Rating</label>
//                     <input type="number"
//                       value={rating}
//                       onChange={(e) => setRating(e.target.value)}
//                       name="rating"
//                       className="form-control"
//                       step="0.1"
//                       min="0"
//                       max="5" />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="category">Category</label>
//                     <input type="text"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       name="category"
//                       className="form-control" />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="image">Image</label>
//                     <input type="file"
//                       name="image"
//                       className="form-control"
//                       onChange={(e) => setImage(e.target.files[0])} />
//                     {selectedProduct?.images?.url && <img src={selectedProduct.images.url} alt="product-image" width="50px" />}
//                   </div>
//                   <button type="submit" className="btn btn-dark">Update Product</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ProductsList;

//============================================================================

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';
import Loading from '../layout/Loading';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, updateProduct, clearErrors } from '../../redux/actions/ProductAction';
import { getCategory } from '../../redux/actions/CategoryAction';

function ProductsList() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.prod);
  const { categories: categoryList } = useSelector(state => state.cat || {});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const updateProductModalRef = useRef(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
    alert.success('Product deleted successfully');
    dispatch(getProducts());  // Re-fetch the updated products list
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setRating(product.rating);
    setCategory(product.category);  // Set the category name here
    setImage(product.images?.url || '');
    setModalVisible(true);
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('rating', rating);
    formData.append('category', category);  // Save the category name here
    if (image) {
      formData.append('images', image);
    }

    try {
      await dispatch(updateProduct(selectedProduct._id, formData));
      alert.success('Product updated successfully');
      setModalVisible(false);
      dispatch(getProducts());
    } catch (error) {
      console.error('Product update failed', error);
    }
  };

  const setProduct = () => {
    const data = {
      columns: [
        { label: 'Id', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Price', field: 'price', sort: 'asc' },
        { label: 'Stock', field: 'stock', sort: 'asc' },
        { label: 'Category', field: 'category', sort: 'asc' },
        { label: 'Image', field: 'image', sort: 'asc' },
        { label: 'Actions', field: 'actions' },
      ],
      rows: []
    };

    products.forEach(product => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `Rs:${product.price}`,
        stock: product.stock,
        category: product.category,
        image: (
          product.images && product.images.url ?
            <img src={product.images.url} width={'100'} alt='product-image' /> :
            <span>No Image</span>
        ),
        actions: (
          <>
            <button
              className="btn btn-primary py-1 px-2"
              onClick={() => handleUpdateClick(product)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        )
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={'Products'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Products</h1>
          {loading ? <Loading /> : (
            <MDBDataTable
              data={setProduct()}
              className='px-3'
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>

      {/* Update Product Modal */}
      {modalVisible && (
        <div className="modal fade show" style={{ display: 'block' }} ref={updateProductModalRef}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleProductUpdate}>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      name="price"
                      className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock">Stock</label>
                    <input type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      name="stock"
                      className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating">Rating</label>
                    <input type="number"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      name="rating"
                      className="form-control"
                      step="0.1"
                      min="0"
                      max="5" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryList.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image">Image</label>
                    <input type="file"
                      name="image"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])} />
                    {selectedProduct?.images?.url && <img src={selectedProduct.images.url} alt="product-image" width="50px" />}
                  </div>
                  <button type="submit" className="btn btn-dark">Update Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsList;



