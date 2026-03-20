import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function AnnonceEnAttente() {
//Données
    const [annonces, setAnnonces] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

//Comportement
  useEffect(() => {
    const q = query(
      collection(db, "annonces"),
      where("statut", "==", "en attente"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setAnnonces(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsub();
  }, []);
 


    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
    try {
        await deleteDoc(doc(db, "annonces", selectedId));
        setShowModal(false);
        setSuccessMessage("Annonce supprimée avec succès ✅");

        setTimeout(() => {
           setSuccessMessage("");
           navigate("/raktak");
        }, 2000);
    } catch (error) {
        console.error(error);
    }
    };


    const handleAccept = async (id) => {
    try {
        await updateDoc(doc(db, "annonces", id), {
        statut: "approuvé",
        });

        setSuccessMessage("Annonce approuvée ✅");
          setTimeout(() => {
          setSuccessMessage("");
          navigate("/raktak");
        }, 2000);
    } catch (error) {
        setErrorMessage("Erreur lors de l'approbation ❌");
        console.error(error);
    }
    };

    const handleInfo = (annonce) => {
    const message = `Bonjour, nous souhaitons plus d'informations concernant votre annonce *${annonce.titre}* à *${annonce.lieu}*.`;

    const url = `https://wa.me/${annonce.telephone}?text=${encodeURIComponent(
        message
    )}`;

    window.open(url, "_blank");
    };

    const handleEdit = (id) => {
    navigate(`/raktak/edit/${id}`);
    };


  return (
    <div>
       <Header/>
       <Sidebar/>  
      <main id="main" className="main">

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Liste des annonces en attente</h5>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Titre</th>
                      <th scope="col">Description</th>
                      <th scope="col">Lieu</th>
                      <th scope="col">Logement</th>
                      <th scope="col">Téléphone</th>
                      <th scope="col">Date</th>
                      <th scope="col">Statut</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {annonces.map(a => (
                    <tr key={a.id}>
                      <td>{a.titre}</td>
                      <td>{a.description}</td>
                      <td>{a.lieu}</td>
                      <td>{a.logement}</td>
                      <td>{a.telephone}</td>
                      <td>{a.createdAt?.toDate().toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</td>
                      <td>{a.statut}</td>
                      <td>   
                          <button type="button" className="btn btn-success" onClick={() => handleAccept(a.id)}><i className="bi bi-check-circle"></i></button>
                          <button type="button" className="btn btn-danger" onClick={() => openDeleteModal(a.id)}><i className="bi bi-exclamation-octagon"></i></button>
                          <button type="button" className="btn btn-warning" onClick={() => handleEdit(a.id)}><i className="bi bi-pencil"></i></button>
                          <button type="button" className="btn btn-info" onClick={() => handleInfo(a)}><i className="bi bi-info-circle"></i></button></td>
                    </tr>
                  ))}
                  </tbody>
                </table>

              </div>
            </div>

            </div>
          </div>
        </section>

      </main>{/* End #main */}  

      <Footer />

          {successMessage && (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000
        }}
      >
        {successMessage}
      </div>
    )}
         {errorMessage && (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#d32b25",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000
        }}
      >
        {errorMessage}
      </div>
    )}

    {showModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title text-danger">
            Confirmation de suppression
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          Êtes-vous sûr de vouloir supprimer cette annonce ?
          <br />
          <strong>Cette action est irréversible.</strong>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Annuler
          </button>

          <button
            className="btn btn-danger"
            onClick={confirmDelete}
          >
            Oui, Supprimer
          </button>
        </div>

      </div>
    </div>
  </div>
)}

    </div>
    
  );
}

export default AnnonceEnAttente