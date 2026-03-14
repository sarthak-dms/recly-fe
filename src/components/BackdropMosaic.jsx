const TILE_COUNT = 15;

const BackdropMosaic = () => {
  return (
    <div className="backdrop-mosaic" aria-hidden="true">
      {Array.from({ length: TILE_COUNT }, (_, index) => (
        <span key={index} className="backdrop-mosaic__tile" />
      ))}
    </div>
  );
};

export default BackdropMosaic;
