
import { Blurhash } from 'react-blurhash';
import { useEffect, useState } from 'react';

const ImageComponent = function (src: string, hash: string) {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image()

    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  }, [src])

  return (
    <>
      <Blurhash width='100%' height='100%' resolutionX={32} resolutionY={32} punch={1} hash={hash}
        className={imageLoaded ? 'hidden' : ''} />

      <img src={src} alt=""
        className={!imageLoaded ? 'hidden' : ''} />
    </>
  )

}

export { ImageComponent };