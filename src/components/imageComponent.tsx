import { Blurhash } from 'react-blurhash';
import { useEffect, useState } from 'react';

const ImageComponent = ({ src, hash }: { src: string, hash: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setTimeout(() => {setImageLoaded(true);}, 0);
      
    };
    img.src = src;
  }, [src]);

  return (
    <div className='cursor-pointer'>
      {!imageLoaded && <Blurhash hash={hash} height={192} width={192} punch={1} className='hidden'/>}
      {imageLoaded && <img src={src} alt="" className='h-48 w-48 object-cover rounded-xl'/>}
    </div>
  );
};

export { ImageComponent };