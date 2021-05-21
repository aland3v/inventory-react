import { MdDeleteForever } from 'react-icons/md';
import { removeImg, updateDocument } from '../server';
import './styles/ImageEliminable.css';

export const ImageEliminable = ({ imagesUrl, id, setImagesUrl }) => {
  const handleRemove = async (image, index) => {
    if (!window.confirm('Seguro que deseas eliminar imagen?')) return;
    try {
      await removeImg(image);
    } catch (error) {
      console.log(error.message);
    }
    try {
      imagesUrl.splice(index, 1);
      await updateDocument('productos', id, { urls: imagesUrl });
      setImagesUrl([...imagesUrl]);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="row">
      {imagesUrl.map((image, index) => (
        <div className="col-3 pb-4" key={index}>
          <div
            className="icon-container"
            onClick={() => handleRemove(image, index)}>
            <MdDeleteForever
              className="icon-del"
              style={{ color: 'red', fontSize: '1.5em' }}
            />
          </div>
          <img src={image} className="img-preview" alt="Img" />
        </div>
      ))}
    </div>
  );
};
