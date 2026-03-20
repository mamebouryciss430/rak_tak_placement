import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from "../components/Footer";

function Contact() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Contact Rak Tak</h1>
        </div>{/*-- End Page Title */}

        <section className="section contact">

          <div className="row gy-4">

            <div className="col-xl-6">

              <div className="row">
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Adresse</h3>
                    <p>Dakar,<br/>Thiaroy</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-telephone"></i>
                    <h3>Téléphone</h3>
                    <p>+221 78 739 29 29<br/>+221 77 284 23 31</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-envelope"></i>
                    <h3>Email </h3>
                    <p>raktakplacement@gmail.com</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card">
                    <i className="bi bi-clock"></i>
                    <h3>Ouverture</h3>
                    <p>Du lundi au vendredi<br/>De 9h00 à 18h00</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-xl-6">
                <img alt="raktak" src="assets/img/raktak.jpeg"  style={{ width: "430px", height: "auto" }}/>
            </div>

          </div>

        </section>

      </main>{/*-- End #main */}

      <Footer/>
    </div>
  )
}

export default Contact