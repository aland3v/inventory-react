export const UploadMessage = ({ title, body, type }) => {
  return (
    <div className={`alert alert-dismissible ${type}`}>
      <button type="button" className="close" data-dismiss="alert">
        &times;
      </button>
      <strong>{title}</strong>
      {` ${body}`}.
    </div>
  );
};
