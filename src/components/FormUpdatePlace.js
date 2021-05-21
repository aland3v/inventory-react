import { useState, useEffect } from 'react';
import DropzoneComponent from './DropzoneComponent';
import { getDocument } from '../server';
import { ImageEliminable } from './ImageEliminable';

export const FormUpdatePlace = ({ handleSubmit, id }) => {
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [files, setFiles] = useState([]);
  let [imagesUrl, setImagesUrl] = useState([]);
  let [precioUnitario, setPrecioUnitario] = useState('');
  let [estado, setEstado] = useState('');
  let [cantidad, setCantidad] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let place = await getDocument('productos', id);
        setName(place.name);
        setDescription(place.description);
        setPrecioUnitario(place.precioUnitario);
        setCantidad(place.cantidad);
        setEstado(place.estado);
        setImagesUrl(place.urls);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  const handleSubmitForm = e => {
    e.preventDefault();
    const fieldsData = {
      name,
      description,
      cantidad,
      precioUnitario,
      estado,
      urls: [...imagesUrl],
    };
    handleSubmit(fieldsData, files);
  };

  return (
    <form action="" onSubmit={handleSubmitForm}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          rows="6"
          name="descripcion"
          className="form-control"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required></textarea>
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Cantidad"
          className="form-control"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Precio Unitario"
          className="form-control"
          value={precioUnitario}
          onChange={e => setPrecioUnitario(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Estado"
          className="form-control"
          value={estado}
          onChange={e => setEstado(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <DropzoneComponent setFiles={setFiles} files={files} />
      </div>
      <div className="form-group">
        <ImageEliminable
          imagesUrl={imagesUrl}
          id={id}
          setImagesUrl={setImagesUrl}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Actualizar Producto"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};
