import React, { useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function DropzoneComponent({ setFiles, files }) {
  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    setFiles(curr => [...curr, ...mappedAcc]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const acceptedFileItems = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const thumbs = files.map(file => (
    <div className="col-3 pb-4" key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  ));

  // clean up
  useEffect(
    () => files.forEach(file => URL.revokeObjectURL(file.preview)),
    [files],
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta la imagen aquí</p>
        ) : (
          <p>
            Arrastra y suelta la imagen
            <br />
            (3 Imagénes como maximo)
          </p>
        )}
      </div>
      <aside>
        <h5>Imagenes Aceptadas</h5>
        <ul>{acceptedFileItems}</ul>
      </aside>
      <div className="container">
        <div className="row">{thumbs}</div>
      </div>
    </section>
  );
}

export default DropzoneComponent;
