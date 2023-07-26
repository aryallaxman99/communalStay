const ImageViewer = ({ styling, imageName }) => {
  return (
    <div>
      <img
        alt={imageName}
        className={styling}
        src={`http://localhost:8000/uploads/${imageName}`}
      />
    </div>
  );
};

export default ImageViewer;
