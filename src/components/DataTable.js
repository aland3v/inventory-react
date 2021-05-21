import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  removeImg,
  getDocument,
  getCollection,
  onSnapshotCollection,
  removeDocument,
} from '../server';

import './styles/DataTable.css';

export const DataTable = () => {
  const [places, setPlaces] = useState([]);
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
    ok: null,
  });

  useEffect(() => {
    (async () => {
      setRequestStatus({ loading: true, error: null, ok: null });
      try {
        let docs = await getCollection('productos');
        if (docs) {
          setPlaces([]);
          docs.forEach(doc => {
            setPlaces(curr => [...curr, { id: doc.id, ...doc.data() }]);
          });
        } else {
          console.log('Todavía no documentos');
        }
        onSnapshotCollection('productos', setPlaces);
        setRequestStatus({ loading: false, error: null, ok: 'ok' });
      } catch (error) {
        setRequestStatus({ loading: false, error: error.message, ok: null });
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Esta seguro?')) {
      try {
        let { urls } = await getDocument('productos', id);
        for (let i = 0; i < urls.length; i++) {
          await removeImg(urls[i]);
        }
        await removeDocument('productos', id);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const showId = id => id.substring(0, 8) + '...';

  if (requestStatus.loading) {
    return 'cargando';
  }

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio Unit.</th>
          <th>Fecha Ing.</th>
          <th>Estado</th>
          <th>Imagen</th>
          <th>Actualizar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {places.map(place => {
          return (
            <tr key={place.id}>
              <td className="align-middle">{showId(place.id)}</td>
              <td className="align-middle">{place.name}</td>
              <td className="align-middle">{place.cantidad}</td>
              <td className="align-middle">{place.precioUnitario}</td>
              <td className="align-middle">
                {place.createdAt.toDate().toDateString()}
              </td>
              <td className="align-middle">{place.estado}</td>
              <td className="align-middle">
                <img src={place.urls[0]} alt="imagen" />
              </td>
              <td className="align-middle">
                <Link
                  className="btn btn-success btn-block"
                  to={`/update/${place.id}`}>
                  Editar
                </Link>
              </td>
              <td className="align-middle">
                <button
                  onClick={() => handleDelete(place.id)}
                  className="btn btn-danger btn-block">
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
