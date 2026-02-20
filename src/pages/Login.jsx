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
        <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                    <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src="../assets/img/logo.jpg" alt="" class="rounded-circle"/>
                    <span class="d-none d-lg-block">Rak Tak Placement</span>
                    </a>
                </div>{/* End Logo */}

                <div class="card mb-3">

                    <div class="card-body">

                    <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">Connexion à votre compte</h5>
                        <p class="text-center small">Entrer votre email et mot de passe pour se connecter</p>
                    </div>
                    {error && (
                    <div className="alert alert-danger">{error}</div>
                    )}
                    <form class="row g-3 needs-validation" onSubmit={handleLogin}>

                        <div class="col-12">
                        <label for="email" class="form-label">Email</label>
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="email" class="form-control" id="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        </div>
                        </div>

                        <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="yourPassword"
                        onChange={(e) => setPassword(e.target.value)}
                         required/>
                        </div>

                        <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                            <label class="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                        </div>
                        <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">Login</button>
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