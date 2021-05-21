import React, { useState } from 'react';
import { FormNewProduct } from '../components/FormNewProduct';
import { UploadMessage } from '../components/UploadMessage';
import { PageLoading } from './PageLoading';
import { subirVariosFilesAndDocument, existeElProducto } from '../server';

export const PageNew = props => {
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    error: null,
    ok: null,
  });

  const { loading, error, ok } = uploadStatus;

  const handleSubmit = async (docData, storgFiles) => {
    setUploadStatus({
      loading: true,
      error: null,
      ok: null,
    });
    try {
      const existe = await existeElProducto('productos', docData.name);
      if (existe) {
        alert('El producto ya existe!!!');
        setUploadStatus({
          loading: false,
          error: {
            title: '',
            body: 'Debes ingresar un nombre de producto que no exista',
            type: 'alert-danger',
          },
          ok: null,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      await subirVariosFilesAndDocument(
        docData,
        storgFiles,
        'productos',
        setUploadStatus,
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col col-md-6 offset-md-3">
          <h3>Crear producto nuevo</h3>
          {ok ? (
            <UploadMessage {...ok} />
          ) : error ? (
            <UploadMessage {...error} />
          ) : (
            ''
          )}
          <FormNewProduct handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
