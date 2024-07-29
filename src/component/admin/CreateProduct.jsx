import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { createProduct } from '../../redux/actions/ProductAction'; // Adjust path if needed

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error = '', success = '' } = useSelector(state => state.prod || {});

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('rating', rating);
    formData.append('category', category);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await dispatch(createProduct(formData));
    } catch (err) {
      console.error('Error details:', err);
      alert.error('Error creating product: ' + (err.response?.data?.message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      alert.success('Product created successfully');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setRating('');
      setCategory('');
      setImages([]);
      navigate('/admin/product');
    }
  }, [success, alert, navigate]);

  useEffect(() => {
    if (error) {
      alert.error('Error: ' + error);
    }
  }, [error, alert]);

  return (
    <>
      <MetaData title={'Create Product'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="container mt-4">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">Create Product</h1>
                {success && <p className="text-success text-center">{success}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                      type="number"
                      id="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                      type="number"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="form-control"
                      step="0.1"
                      min="0"
                      max="5"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input
                      type="text"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">Product Images</label>
                    <input
                      type="file"
                      id="images"
                      onChange={handleImageChange}
                      className="form-control"
                      accept="image/*"
                      multiple
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
