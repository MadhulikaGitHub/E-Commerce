import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { insertCategory } from '../../redux/actions/CategoryAction'; // Adjust path if needed

function CreateCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector(state => state.cat);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('images', image);
    }

    console.log('Submitting FormData:', ...formData.entries());

    try {
      await dispatch(insertCategory(formData));
    } catch (err) {
      console.error('Error details:', err);
      alert.error('Error creating category: ' + (err.response?.data?.message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Check Redux state for success and handle navigation
  useEffect(() => {
    if (success) {
      alert.success('Category created successfully');
      setName('');
      setImage(null);
      navigate('/admin/category');
    }
  }, [success, alert, navigate]);

  // Check for errors
  useEffect(() => {
    if (error) {
      alert.error('Error: ' + error);
    }
  }, [error, alert]);

  return (
    <>
      <MetaData title={'Create Category'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="container mt-4">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">Create Category</h1>
                {success && <p className="text-success text-center">{success}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
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
                    <label htmlFor="image" className="form-label">Category Image</label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Creating...' : 'Create Category'}
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

export default CreateCategory;
