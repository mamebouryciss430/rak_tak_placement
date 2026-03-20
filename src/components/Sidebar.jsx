import React from 'react'
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Sidebar() {

      const [user, setUser] = useState(null);
    
      useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    
      return () => unsubscribe();
    }, []);

  return (
    <div>
                  {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <a className="nav-link collapsed" href="/create">
                <i style={{color: "blue"}} className="bi bi-megaphone"> </i>
                <span>Publier une annonce</span>
                </a>
            </li>{/* End Dashboard Nav */}

            <li className="nav-item">
                <a className="nav-link collapsed" href="/">
                <i style={{color: "blue"}} className="bi bi-chat-right-text"></i>                
                <span>Toutes les annonces</span>
                </a>
            </li>{/* End Dashboard Nav */}

            <li className="nav-item">
                <a className="nav-link collapsed" href="/contact">
                <i style={{color: "blue"}} className="bi bi-info-square"></i>                
                <span>Info</span>
                </a>
            </li>{/* End Dashboard Nav */}

            {user && (
             <div>
                <li className="nav-heading">Administration</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/raktak">
                    <i style={{color: "blue"}} className="bi bi-download"></i>
                    <span>Annonces en attente</span>
                    </a>
                </li>{/* End Profile Page Nav */}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/raktakApproved">
                    <i style={{color: "blue"}} className="bi bi-check-circle"></i>
                    <span>Annonces approuvées</span>
                    </a>
                </li>
             </div>
            )}
            </ul>

        </aside>{/* End Sidebar*/}
    </div>
  )
}

export default Sidebar