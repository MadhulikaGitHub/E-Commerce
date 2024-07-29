import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const linkStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const rightIconStyle = {
        marginLeft: 'auto',
    };

    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard">
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </Link>
                    </li>

                    {/* Category */}
                    <li>
                        <Link to="#categorySubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" style={linkStyle}>
                            <div>
                                <i class="fa-solid fa-layer-group"></i> Category
                            </div>
                            <i className="fa-solid fa-caret-down" style={rightIconStyle}></i>
                        </Link>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                                <Link to="/admin/category">
                                    <i className="fas fa-clipboard-list"></i> All
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/createCategory">
                                    <i className="fas fa-plus"></i> Create
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Products */}
                    <li>
                        <Link to="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle" style={linkStyle}>
                            <div>
                                <i className="fab fa-product-hunt"></i> Products
                            </div>
                            <i className="fa-solid fa-caret-down" style={rightIconStyle}></i>
                        </Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/product">
                                    <i className="fas fa-clipboard-list"></i> All
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/createProduct">
                                    <i className="fas fa-plus"></i> Create
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/product">
                            <i className="fas fa-shopping-basket"></i> Orders
                        </Link>
                    </li>

                    <li>
                        <Link to="#">
                            <i className="fas fa-users"></i> Users
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
