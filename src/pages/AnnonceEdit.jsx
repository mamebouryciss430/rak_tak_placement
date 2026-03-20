import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function AnnonceEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    logement: "Non",
    lieu: "",
    numero_whatsapp: ""
  });

  // 🔄 Charger l'annonce existante
  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const docRef = doc(db, "annonces", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert("Annonce introuvable ❌");
          navigate("/raktak");
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur récupération annonce:", error);
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id, navigate]);

  //  Gestion changement input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  //  Mise à jour annonce
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "annonces", id), {
        ...formData,
        updatedAt: serverTimestamp()
      });

      setSuccessMessage("Annonce mise à jour avec succès ✅");

      setTimeout(() => {
        navigate("/raktak");
      }, 2000);

    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la modification ❌");
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Chargement de l'annonce...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main" className="main">

        <div className="pagetitle">
          <h1>
            <i style={{ color: "blue" }} className="bi bi-pencil-square"></i>
            {" "}Modifier l'annonce
          </h1>
          <br />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-10">

              <div className="card">
                <div className="card-body">

                  <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Titre</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="titre"
                          value={formData.titre}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Description</label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Logement</label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          name="logement"
                          value={formData.logement}
                          onChange={handleChange}
                        >
                          <option value="Non">
                            Non
                          </option>
                          <option value="Oui">
                            Oui
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Lieu</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="lieu"
                          value={formData.lieu}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Numéro WhatsApp
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary">
                          <i className="bi bi-check-circle"></i>
                          {" "}Mettre à jour
                        </button>
                      </div>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

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

    </div>
  );
}

export default AnnonceEdit;
