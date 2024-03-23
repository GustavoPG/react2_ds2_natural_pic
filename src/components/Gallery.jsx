import { useContext } from 'react';
import { GalleryContext } from '../contexts/GalleryContext';
import IconHeart from './IconHeart';

const Gallery = () => {
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
    <>
      <h1>Photo Gallery</h1>
      <div className="image-container">
      {data.map(photo => (
        <div className="my-image" key={photo.id}>
          <img src={photo.src} alt={photo.alt} />
          <div className="heart" onClick={() => handleLikeToggle(photo.id)}>
          <IconHeart filled={photo.liked} />
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Gallery;