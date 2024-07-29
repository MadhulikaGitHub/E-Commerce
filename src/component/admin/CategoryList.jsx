// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { MDBDataTable } from 'mdbreact'

// import Sidebar from './Sidebar'
// import Loading from '../layout/Loading'
// import MetaData from '../layout/MetaData'
// import { useAlert } from 'react-alert'
// import { useDispatch, useSelector } from 'react-redux';
// import { getCategory, deleteCategory } from '../../redux/actions/CategoryAction'
// import { clearErrors } from '../../redux/actions/UserAction';

// function CategoryList() {
//   const alert = useAlert();
//   const dispatch = useDispatch();

//   const { loading, error, categories } = useSelector(state => state.cat);

//   useEffect(() => {
//     dispatch(getCategory());
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, alert, error]);

//   const deleteCategoryHandler = async (id) => {
//     await dispatch(deleteCategory(id));
//     alert.success('Category deleted successfully');
//     dispatch(getCategory());  // Re-fetch the updated categories list
//   };

//   const setCategories = () => {
//     const data = {
//       columns: [
//         {
//           label: 'Id',
//           field: 'id',
//           sort: 'asc'
//         },
//         {
//           label: 'Name',
//           field: 'name',
//           sort: 'asc'
//         },
//         {
//           label: 'Image',
//           field: 'image',
//           sort: 'asc'
//         },
//         {
//           label: 'Actions',
//           field: 'actions'
//         },
//       ],
//       rows: []
//     };

//     if (Array.isArray(categories)) {
//       categories.forEach(item => {
//         data.rows.push({
//           id: item._id,
//           name: item.name,
//           image: <img src={item.images.url} width={'100'} alt="Category" />,
//           actions: (
//             <>
//               <Link to={`/admin/category/${item._id}`} className='btn btn-primary py-1 px-2'>
//                 <i className="fa fa-pencil"></i>
//               </Link>
//               <button
//                 className="btn btn-danger py-1 px-2 ml-2"
//                 onClick={() => deleteCategoryHandler(item._id)}
//               >
//                 <i className="fa fa-trash"></i>
//               </button>
//             </>
//           )
//         });
//       });
//     }

//     return data;
//   };

//   return (
//     <>
//       <MetaData title={'Category'} />
//       <div className="row">
//         <div className="col-12 col-md-2">
//           <Sidebar />
//         </div>
//         <div className="col-12 col-md-10">
//           <h1 className="my-5">All Categories</h1>
//           {loading ? <Loading /> : (
//             <MDBDataTable
//               data={setCategories()}
//               className='px-3'
//               bordered
//               striped
//               hover
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CategoryList;

import React, { useEffect, useState, useRef } from 'react'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import Loading from '../layout/Loading'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, deleteCategory, updateCategory, clearErrors } from '../../redux/actions/CategoryAction'

function CategoryList() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, categories } = useSelector(state => state.cat);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const updateCategoryModalRef = useRef(null);

  useEffect(() => {
    dispatch(getCategory());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const deleteCategoryHandler = async (id) => {
    await dispatch(deleteCategory(id));
    alert.success('Category deleted successfully');
    dispatch(getCategory());  // Re-fetch the updated categories list
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setImage(category.images?.url || '');
    setModalVisible(true);
  };

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('images', image);
    }

    try {
      await dispatch(updateCategory(selectedCategory._id, formData));
      alert.success('Category updated successfully');
      setModalVisible(false);
      dispatch(getCategory());
    } catch (error) {
      console.error('Category update failed', error);
    }
  };

  const setCategories = () => {
    const data = {
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Image',
          field: 'image',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions'
        },
      ],
      rows: []
    };

    if (Array.isArray(categories)) {
      categories.forEach(item => {
        data.rows.push({
          id: item._id,
          name: item.name,
          image: <img src={item.images.url} width={'100'} alt="Category" />,
          actions: (
            <>
              <button
                className="btn btn-primary py-1 px-2"
                onClick={() => handleUpdateClick(item)}
              >
                <i className="fa fa-pencil"></i>
              </button>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteCategoryHandler(item._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          )
        });
      });
    }

    return data;
  };

  return (
    <>
      <MetaData title={'Category'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-5">All Categories</h1>
          {loading ? <Loading /> : (
            <MDBDataTable
              data={setCategories()}
              className='px-3'
              bordered
              striped
              hover
            />
          )}
        </div>
      </div>

      {/* Update Category Modal */}
      {modalVisible && (
        <div className="modal fade show" style={{ display: 'block' }} ref={updateCategoryModalRef}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Category</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCategoryUpdate}>
                  <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image">Image</label>
                    <input type="file"
                      name="image"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])} />
                    {selectedCategory?.images?.url && <img src={selectedCategory.images.url} alt="category-image" width="50px" />}
                  </div>
                  <button type="submit" className="btn btn-dark">Update Category</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryList;






