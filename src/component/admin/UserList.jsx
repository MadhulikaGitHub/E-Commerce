import React from 'react'
import Loading from '../layout/Loading'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useEffect } from 'react'
import { getAllUsers, clearErrors } from '../../redux/actions/UserAction'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

function UserList() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers)
    console.log(users)

    useEffect(() => {
        dispatch(getAllUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const setUsers = () => {
        const data = {
            columns: [
                { label: 'Image', field: 'image', sort: 'asc' },
                { label: 'Id', field: 'id', sort: 'asc' },
                { label: 'Name', field: 'name', sort: 'asc' },
                { label: 'email', field: 'email', sort: 'asc' },
                { label: 'role', field: 'role', sort: 'asc' }

            ],
            rows: []
        };

        // Ensure users is defined before using it
        if (users) {
            users.forEach(user => {
                data.rows.push({
                    image: (
                        user.image && user.image.url ?
                            <img src={user.image.url} width={'100'} alt='user-image' /> :
                            <span>No Image</span>
                    ),
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,

                });
            });
        }
        return data;
    };



    return (
        <>

            <MetaData title={'Users'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className='mt-5'>Users</h1>
                    {loading ? <Loading /> : (
                        <MDBDataTable
                            data={setUsers()}
                            className='px-3'
                            bordered
                            striped
                            hover
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default UserList