import { Blurhash } from 'react-blurhash';
import { useEffect, useState } from 'react';

const ImageComponent = ({ src, hash }: { src: string, hash: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      {!imageLoaded && <Blurhash hash={hash} height={384} width={384} punch={1} />}
      {imageLoaded && <img src={src} alt="" className='h-96 w-96 object-cover object-top' />}
    </>
  );
};

export { ImageComponent };