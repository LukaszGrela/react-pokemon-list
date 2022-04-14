import { useEffect, useMemo, useRef } from 'react';
import { Image } from '../Image';

import './style/index.scss';

type TPathToPNG = string;
export interface IProps {
  src: TPathToPNG;
}

function getBase64FromImageUrl(url: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new global.Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx?.drawImage(img, 0, 0);
  };
  img.onerror = console.error;

  return canvas;
}

const useCanvas = (
  url: TPathToPNG,
  trim: boolean = false
): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = useMemo(() => new global.Image(), []);

  img.setAttribute('crossOrigin', 'anonymous');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      img.src = url;

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        context?.drawImage(img, 0, 0);
        if (trim) {
          // bottom-trim
          let trimTo = -1;
          bottomTrim: for (let r = img.height; --r >= 0; ) {
            // row by row
            for (let c = 0; c < img.width; c++) {
              // columns
              const data = context?.getImageData(c, r, 1, 1, {
                colorSpace: 'srgb',
              });
              if (data && data.data && data.data[3] === 255) {
                trimTo = r + 1;
                console.log('break', r, c, data);
                break bottomTrim;
              }
            }
          }
          let trimTop = -1;
          console.log('trimTo', trimTo, canvas.height);
          if (trimTo > 0) {
            canvas.height = trimTo;
            context?.clearRect(0,0,img.width, trimTo);
            context?.drawImage(img, 0, 0, img.width, trimTo, 0, 0, img.width, trimTo);
          }
        }
      };
      img.onerror = console.error;
    }
    return () => {};
  }, [img, url, trim]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({ src }: IProps): JSX.Element => {
  const canvasRef = useCanvas(src);
  const canvas2Ref = useCanvas(src, true);

  return (
    <div
      className='SilhouetteImage'
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    >
      <>
        <canvas ref={canvasRef} />
        <canvas ref={canvas2Ref} />
        <Image src={src} className='SilhouetteImage_silhouette' />
      </>
    </div>
  );
};

export default SilhouetteImage;
