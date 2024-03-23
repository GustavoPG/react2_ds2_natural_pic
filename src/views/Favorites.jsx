import { useContext } from 'react';
import { GalleryContext } from '../contexts/GalleryContext';
import IconHeart from '../components/IconHeart';

const Favorites = () => {
  const { data, setData } = useContext(GalleryContext);

  // Muestra un mensaje de carga, --sin esto me generaba error en la carga inicial de las imágenes.--
  if (!data) {
    return <div>Loading...</div>;
  }
  const handleLikeToggle = (id) => {
    const newData = [...data];
    const photo = newData.find(photo => photo.id === id);
    photo.liked = !photo.liked;
    setData(newData);
  };

  return (
    <div>
      <h1 className="my-title">Fotos favoritas</h1>
      <div className="image-container">
        {data.filter(photo => photo.liked).map(photo => (
          <div className="my-image" key={photo.id}>
            <img src={photo.src} alt={photo.alt} />
            <div className="heart" onClick={() => handleLikeToggle(photo.id)}>
              <IconHeart filled={photo.liked} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;