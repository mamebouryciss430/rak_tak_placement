import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useNavigate } from "react-router-dom";


function AnnonceForm() {

//Données
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    logement: "Logement non garanti",
    lieu: "",
    telephone: ""
  });

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");


//Comportements
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "annonces"), {
        ...formData,
        statut: "en attente", 
        createdAt: serverTimestamp()
      });

      //alert("Annonce publiée avec succès ✅");
      setSuccessMessage("Annonce en attente d'approbation ✅");


      // Réinitialiser le formulaire
      setFormData({
        titre: "",
        description: "",
        logement: "Logement non garanti",
        lieu: "",
        telephone: ""
      });

      // Redirection après 2 secondes
      setTimeout(() => {
        navigate("/"); //
      }, 2000);

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Erreur lors de la publication ❌");
    }
  };

//Affichage
  return (
    <div>
      <Header />
      <Sidebar />
     <main id="main" class="main">

      <div class="pagetitle">
        <h1>
           Ajouter une annonce</h1>
        <br />
      </div>{/* End Page Title */}

      <section class="section">
        <div class="row">
          <div class="col-lg-10">

            <div class="card">
              <div class="card-body">
                 <br/>
                {/* General Form Elements */}
                <form onSubmit={handleSubmit}>
                  <div class="row mb-3">
                    <label for="inputText" class="col-sm-2 col-form-label">Titre</label>
                    <div class="col-sm-10">
                      <input type="text"   
                      class="form-control"
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      required 
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                      <textarea  class="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Logement</label>
                  <div class="col-sm-10">
                    <select class="form-select" aria-label="Default select example" 
                    name="logement" onChange={handleChange} value={formData.logement}>
                      <option value="Logement non garanti">Logement non garanti</option>
                      <option value="Logement garanti">Logement garanti</option>
                    </select>
                  </div>
                </div>
                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Lieu</label>
                    <div class="col-sm-10">
                      <input type="text"
                      className="form-control"
                      name="lieu"
                      value={formData.lieu}
                      onChange={handleChange}
                      placeholder="ex: Dakar, Grand Yoff"
                      required/>
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
                        placeholder="ex: 221775007700"
                        required
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label class="col-sm-2 col-form-label">Soumettre</label>
                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-primary"><i style={{color: "white"}} class="bi bi-megaphone"> </i>Publier</button>
                    </div>
                  </div>

                </form>{/* End General Form Elements */}

              </div>
            </div>

          </div>
        </div>
      </section>

     </main>{/* End #main */}
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
  )
}

export default AnnonceForm