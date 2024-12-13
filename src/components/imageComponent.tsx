import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

const ImageComponent = ({ src }: { src: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setTimeout(() => { setImageLoaded(true); }, 0);

    };
    img.src = src;
  }, [src]);

  return (
    <div className='cursor-pointer'>
      {!imageLoaded && <Skeleton className='h-48 w-48 rounded-xl' />}
      {imageLoaded && <img src={src} alt="" className='h-48 w-48 object-cover rounded-xl' />}
    </div>
  );
};

export { ImageComponent };