import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AnnonceForm() {

  // Données
  const [formData, setFormData] = useState({
    titre: "",
    customTitre: "",
    description: "",
    logement: "Non",
    lieu: "",
    telephone: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Gestion des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 🔹 Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si "Autre", on prend customTitre
    const finalTitre =
      formData.titre === "Autre"
        ? formData.customTitre
        : formData.titre;

    try {
      await addDoc(collection(db, "annonces"), {
        titre: finalTitre,
        description: formData.description,
        logement: formData.logement,
        lieu: formData.lieu,
        telephone: formData.telephone,
        statut: "en attente",
        createdAt: serverTimestamp()
      });

      setSuccessMessage("Annonce en attente d'approbation ✅");

      // Reset formulaire
      setFormData({
        titre: "",
        customTitre: "",
        description: "",
        logement: "Non",
        lieu: "",
        telephone: ""
      });

      // Redirection
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la publication ❌");
    }
  };

  //  Affichage
  return (
    <div>
      <Header />
      <Sidebar />

      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Ajouter une annonce</h1>
          <br />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-10">

              <div className="card">
                <div className="card-body">
                  <br />

                  <form onSubmit={handleSubmit}>

                    {/* POSTE */}
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Type de Poste</label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          name="titre"
                          value={formData.titre}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- Choisir un poste --</option>
                          <option value="Femme de ménage">Femme de ménage</option>
                          <option value="Chauffeur">Chauffeur</option>
                          <option value="Sécurité">Sécurité</option>
                          <option value="Cuisinier">Cuisinier</option>
                          <option value="Nounou">Nounou</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    {/* AUTRE */}
                    {formData.titre === "Autre" && (
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Préciser</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="customTitre"
                            value={formData.customTitre}
                            onChange={handleChange}
                            placeholder="Ex: Jardinier, Gardien..."
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* DESCRIPTION */}
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

                    {/* LOGEMENT */}
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Logement</label>
                      <div className="col-sm-10">
                        <select
                          className="form-select"
                          name="logement"
                          value={formData.logement}
                          onChange={handleChange}
                        >
                          <option value="Non">Non</option>
                          <option value="Oui">Oui</option>
                        </select>
                      </div>
                    </div>

                    {/* LIEU */}
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Lieu</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="lieu"
                          value={formData.lieu}
                          onChange={handleChange}
                          placeholder="ex: Dakar, Grand Yoff"
                          required
                        />
                      </div>
                    </div>

                    {/* TELEPHONE */}
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
                          placeholder="ex: 221775007700"
                          required
                        />
                      </div>
                    </div>

                    {/* BOUTON */}
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Soumettre</label>
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          <i className="bi bi-megaphone"></i> Publier
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

      <Footer/>

      {/* MESSAGE SUCCESS */}
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

export default AnnonceForm;