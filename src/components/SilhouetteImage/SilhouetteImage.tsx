import { useEffect, useMemo, useRef } from 'react';
import { rgbToChannels, TRGB } from '../../utils/colors';

import './style/index.scss';

type TPathToPNG = string;
export interface IProps {
  src: TPathToPNG;
}

const useCanvas = (
  url: TPathToPNG,
  trim: boolean = false,
  color: TRGB = 0
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
          let trimBottom = -1;
          bottomTrim: for (let r = img.height; --r >= 0;) {
            // row by row
            for (let c = 0; c < img.width; c++) {
              // columns
              const data = context?.getImageData(c, r, 1, 1, {
                colorSpace: 'srgb',
              });
              if (data && data.data && data.data[3] === 255) {
                trimBottom = r + 1;
                console.log(data.data)
                break bottomTrim;
              }
            }
          }
          let trimTop = -1;
          topTrim: for (let r = 0; r < (trimBottom !== -1 ? trimBottom : img.height); r++) {
            // top-trim
            for (let c = 0; c < img.width; c++) {
              // columns
              const data = context?.getImageData(c, r, 1, 1, {
                colorSpace: 'srgb',
              });
              if (data && data.data && data.data[3] === 255) {
                trimTop = r - 1;
                break topTrim;
              }
            }
          }

          if (trimBottom > 0 || trimTop > 0) {

            const newHeight = (trimBottom !== -1 ? trimBottom : img.height) - Math.max(trimTop, 0);
            canvas.height = newHeight;

            context?.clearRect(0, 0, img.width, img.height);
            context?.drawImage(img, 0, Math.max(trimTop, 0), img.width, newHeight, 0, 0, img.width, newHeight);
          }
        }
        // paint it
        if (context) {
          const { width, height } = canvas;
          const imageData = context.getImageData(0, 0, width, height);
          const fillData = rgbToChannels(color);
          const r = 0, g = 1, b = 2, a = 3;
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const pos = y * width + x;
              const alpha = imageData.data[pos * 4 + 3]
              if (alpha > 0) {
                // r
                imageData.data[pos * 4 + r] = fillData[r];
                // g
                imageData.data[pos * 4 + g] = fillData[g];
                // b
                imageData.data[pos * 4 + b] = fillData[b];
              }
            }
          }
          // set
          context.putImageData(imageData, 0, 0)
        }
      };
      img.onerror = console.error;
    }
    return () => { };
  }, [img, url, trim, color]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({ src }: IProps): JSX.Element => {
  const canvas2Ref = useCanvas(src, true);

  return (
    <div
      className='SilhouetteImage'
    >
      <canvas ref={canvas2Ref} className='SilhouetteImage_silhouette' />
    </div>
  );
};

export default SilhouetteImage;
