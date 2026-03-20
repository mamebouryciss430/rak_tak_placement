import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Redirection vers dashboard admin
      navigate("/raktak");

    } catch (err) {
      setError("Email ou mot de passe incorrect ❌");
    }
  };

  return (
    <div>
      <main>
        <div className="container">

        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="../assets/img/logo.jpg" alt="" className="rounded-circle"/>
                    <span className="d-none d-lg-block">Rak Tak Placement</span>
                    </a>
                </div>{/* End Logo */}

                <div className="card mb-3">

                    <div className="card-body">

                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Connexion à votre compte</h5>
                        <p className="text-center small">Entrer votre email et mot de passe pour se connecter</p>
                    </div>
                    {error && (
                    <div className="alert alert-danger">{error}</div>
                    )}
                    <form className="row g-3 needs-validation" onSubmit={handleLogin}>

                        <div className="col-12">
                        <label for="email" className="form-label">Email</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="email" className="form-control" id="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        </div>
                        </div>

                        <div className="col-12">
                        <label for="yourPassword" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="yourPassword"
                        onChange={(e) => setPassword(e.target.value)}
                         required/>
                        </div>

                        <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                            <label className="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                        </div>
                        <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">Login</button>
                        </div>
                    </form>

                    </div>
                </div>


                </div>
            </div>
            </div>

        </section>

        </div>
      </main>{/* End #main */}
    </div>
  )
}

export default Login