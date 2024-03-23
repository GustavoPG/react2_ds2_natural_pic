import { createContext, useState, useEffect } from 'react';
import myData from '/public/photos.json';

export const GalleryContext = createContext();

const GalleryProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(myData);
        if (!response.ok) {
          throw new Error("Error al leer datos");
        }
        const newData = await myData.photos.map((photo) => ({
          id: photo.id,
          src: photo.src.medium,
          alt: photo.alt,
          liked: photo.liked,
        }));
        setData(newData);
      } catch (error) {
        console.error("Error al traer datos", error);
      }
    };
    fetchData();
  }, []);

  return (
    <GalleryContext.Provider value={{ data, setData }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;