import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormUpdatePlace } from '../components/FormUpdatePlace';
import { UploadMessage } from '../components/UploadMessage';
import { PageLoading } from './PageLoading';
import { updateDocumentAndFiles } from '../server';

export const PageUpdate = props => {
  let { id: idDoc } = useParams();
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
      await updateDocumentAndFiles(
        docData,
        storgFiles,
        idDoc,
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
          <h3>Actualizar Place</h3>
          {ok ? (
            <UploadMessage {...ok} />
          ) : error ? (
            <UploadMessage {...error} />
          ) : (
            ''
          )}
          <FormUpdatePlace handleSubmit={handleSubmit} id={idDoc} />
        </div>
      </div>
    </div>
  );
};
