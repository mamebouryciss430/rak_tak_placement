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
            <i className="bi bi-list toggle-sidebar-btn" onClick={() => document.body.classList.toggle("toggle-sidebar")}
             style={{ cursor: "pointer" }}></i>
            </div>{/* End Logo */}

            {/*<div class="search-bar">
            <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Vous cherchez une annonce ?" title="Enter search keyword"/>
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
            </form>
            </div>End Search Bar*/}

            <nav className="header-nav ms-auto">

              {/* SI CONNECTÉ */}
              {user ? (
                <ul className="d-flex align-items-center">

                  <li className="nav-item dropdown pe-3">

                    <a
                      className="nav-link nav-profile d-flex align-items-center pe-0"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <img src="assets/img/logo.jpg" alt="Profile" className="rounded-circle"/>
                      <span className="d-none d-md-block dropdown-toggle ps-2">
                        Admin
                      </span>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li className="dropdown-header">
                        <h6>Admin Rak Tak</h6>
                        <span>Placement</span>
                      </li>

                      <li>
                        <hr className="dropdown-divider"/>
                      </li>

                      <li className="text-center">
                        <button onClick={handleLogout} className="btn btn-danger">
                          <i className="bi bi-box-arrow-right"></i> Déconnexion
                        </button>
                      </li>
                    </ul>

                  </li>
                </ul>

              ) : (

                /* PAS CONNECTÉ → afficher login */
                <ul className="d-flex align-items-center">

                  <li className="nav-item pe-3">
                    <a href="/login">
                      <span>
                        <i className="bi bi-box-arrow-right"></i> Se connecter
                      </span>
                    </a>
                  </li>

                </ul>

              )}

            </nav>


        </header>{/* End Header */}
    </div>
  )
}

export default Header