import { useState } from 'react';
import { login } from '../server';

export const PageLogin = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <h3>INICIA SESIÓN</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="tu@email.com"
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary btn-block" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
