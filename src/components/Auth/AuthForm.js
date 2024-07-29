import { useState } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authDataHandler = (event) => {
    const { name, value } = event.target;
    setAuthData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    let url;
    let message;

    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp4cYa6QJIIcMqlFPd28Uuh06UvjM4Z_o";
      message = "Login Successfully";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp4cYa6QJIIcMqlFPd28Uuh06UvjM4Z_o";
      message = "Account Created Successfully";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      alert(message);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
    setAuthData({ email: "", password: "" });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            name="email"
            value={authData.email}
            onChange={authDataHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            name="password"
            value={authData.password}
            onChange={authDataHandler}
          />
        </div>
        <div className={classes.actions}>
          {!loading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {loading && <p className="text-white">Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
