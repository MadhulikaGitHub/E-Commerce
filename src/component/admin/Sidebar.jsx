import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="#"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>

                    <li>
                        <Link to="#categorySubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i> Category</Link>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                                <Link to="/admin/category"><i className="fas fa-clipboard-list"></i> All</Link>
                            </li>

                            <li>
                                <Link to="#"><i className="fas fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i> Products</Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/product"><i className="fas fa-clipboard-list"></i> All</Link>
                            </li>

                            <li>
                                <Link to="#"><i className="fas fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/product"><i className="fas fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link href="#"><i className="fas fa-users"></i> Users</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar