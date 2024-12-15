import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

const ImageComponent = ({ obj }: { obj: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formatedName, setFormatedName] = useState(obj.fileName);

  useEffect(() => {

    if (formatedName.length > 20) {
      setFormatedName(formatedName.slice(0, 17) + '...');
    }

    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = obj.publicUrl;

  }, [obj.publicUrl]);

  return (

    <>
      {!imageLoaded && <Skeleton className='w-full rounded-xl' />}
      {imageLoaded && <img src={obj.publicUrl} alt="" className='border-primary object-cover rounded-xl' />}
    </>

  );
};

export { ImageComponent };