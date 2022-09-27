import { useState, useMutation } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
      setLoading(false);
    },
    variables: {
      email,
      password,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
