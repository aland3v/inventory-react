import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';

export const PageHome = props => {
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-8">
          <h3>Bienvenido de nuevo</h3>
        </div>
        <div className="col-4">
          <Link to={`/new/`} className="btn btn-primary btn-block">
            Agregar producto
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <DataTable />
        </div>
      </div>
    </div>
  );
};
