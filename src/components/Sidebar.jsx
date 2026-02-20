import React from 'react'
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <a class="nav-link collapsed" href="/create">
                <i style={{color: "blue"}} class="bi bi-megaphone"> </i>
                <span>Publier une annonce</span>
                </a>
            </li>{/* End Dashboard Nav */}

            <li class="nav-item">
                <a class="nav-link collapsed" href="/">
                <i style={{color: "blue"}} class="bi bi-chat-right-text"></i>                
                <span>Toutes les annonces</span>
                </a>
            </li>{/* End Dashboard Nav */}

            <li class="nav-item">
                <a class="nav-link collapsed" href="/contact">
                <i style={{color: "blue"}} class="bi bi-info-square"></i>                
                <span>Info</span>
                </a>
            </li>{/* End Dashboard Nav */}

            {user && (
             <div>
                <li class="nav-heading">Administration</li>

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/raktak">
                    <i style={{color: "blue"}} class="bi bi-download"></i>
                    <span>Annonces en attente</span>
                    </a>
                </li>{/* End Profile Page Nav */}
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/raktakApproved">
                    <i style={{color: "blue"}} class="bi bi-check-circle"></i>
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