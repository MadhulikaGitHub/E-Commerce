import React from 'react'
import Loading from '../layout/Loading'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { myOrders } from '../../redux/actions/OrderAction'
import { useEffect } from 'react'

function MyOrder() {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(state => state.myOrders)
  console.log(orders)

  useEffect(() => {
    dispatch(myOrders())
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch.alert, error])

  const setOrers = () => {

    const data = {

      columns: [
        {
          label: 'Order Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Num of Items',
          field: 'numofItems',
          sort: 'asc'

        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'

        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'

        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'

        },
      ],

      rows: []
    }

    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `Rs:${order.totalPrice}`,
        status: order.orderStatus && String(order.orderStatus).includes('Delivered')
          ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
          : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions:
          <Link to={`/order/${order._id}`} className='btn btn-primary'>
            <i className="fa fa-eye"></i>
          </Link>
      })
    })
    return data;
  }


  return (
    <>

      <h1 className='mt-5'>My Orders</h1>
      {loading ? <Loading /> : (
        <MDBDataTable
          data={setOrers()}
          className='px-3'
          bordered
          striped
          hover


        />

      )}

    </>
  )
}

export default MyOrder