// ✅ Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-info" to="/">
          Blog Posts
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/blogsform">
                Create Blogs
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/contacts">
                Contacts
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/auth">
                Register
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/auth">
                Login
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className="btn btn-outline-light btn-sm"
                onClick={() => {
                  localStorage.removeItem("token");

                  window.location.href = "/auth";
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
