import React from 'react'
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
                 {/* ======= Header ======= */}
        <header id="header" class="header fixed-top d-flex align-items-center">

            <div class="d-flex align-items-center justify-content-between">
            <a href="/contact" class="logo d-flex align-items-center">
                <img src="assets/img/logo.jpg" alt="" class="rounded-circle"></img>
                <span class="d-none d-lg-block">Rak Tak Placement</span>
            </a>
            <i class="bi bi-list toggle-sidebar-btn"></i>
            </div>{/* End Logo */}

            {/*<div class="search-bar">
            <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Vous cherchez une annonce ?" title="Enter search keyword"/>
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
            </form>
            </div>End Search Bar*/}

            {user && (
            <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">

                <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="/contact" data-bs-toggle="dropdown">
                    <img src="assets/img/logo.jpg" alt="Profile" class="rounded-circle"/>
                    <span class="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                </a>{/* End Profile Iamge Icon */}

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                    <h6>Admin Rak Tak</h6>
                    <span>Placement</span>
                    </li>
                    <li>
                    <hr class="dropdown-divider"/>
                    </li>

                    <li>
                        <button onClick={handleLogout} className="btn btn-danger">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Déconnexion</span></button>
                    </li>

                </ul>{/* End Profile Dropdown Items */}
                </li>{/* End Profile Nav */}

            </ul>
            </nav>
            )}

        </header>{/* End Header */}
    </div>
  )
}

export default Header