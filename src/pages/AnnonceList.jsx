import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from "../components/Footer";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function AnnonceList() {

const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "annonces"),
      where("statut", "==", "approuvé"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setAnnonces(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsub();
  }, []);



  return (
    <div>
        <Header />

        <Sidebar />

        <main id="main" className="main">

            <div className="pagetitle">
            <h1>Toutes les annonces </h1>
            <br />
            </div>{/* End Page Title */}

            <section className="section">
            <div className="row">
                {annonces.map(a => (
                <div className="col-lg-6" key={a.id}>             
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">{a.titre}</h5>
                    <p>{a.description}</p>
                    <p><i className="bi bi-bank2" style={{color: "#d39c25"}}> </i>Longement : {a.logement}</p>
                    <p><i className="bi bi-geo-alt-fill" style={{color: "#3125d3"}}> </i>{a.lieu}</p>
                    <p><i className="bi bi-bi bi-telephone-plus-fill" style={{color: "#08570c"}}> </i>{a.telephone}</p>
                    <p><i className="bi bi-calendar2-check-fill" style={{color: "#3f25d3"}}> </i>{a.createdAt?.toDate().toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                    
                    <button className="btn btn-outline-success" type="button">
                      <a href={`https://wa.me/${a.telephone}?text=${encodeURIComponent(
                          `Bonjour, je suis intéressé par votre offre *${a.titre}* à *${a.lieu}*.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      style={{color: "#00ff11"}}>
                        <i className="bi bi-whatsapp"> </i>
                          Je suis intéressé </a></button>
                       
                </div>
            
                </div>
                    ))}


            </div>
            </section>

        </main>{/* End #main */}

        <Footer/>        


    </div>
  )
}

export default AnnonceList