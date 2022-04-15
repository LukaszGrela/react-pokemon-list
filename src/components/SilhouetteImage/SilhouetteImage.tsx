import { useEffect, useMemo, useRef } from 'react';
import {
  rgbToChannels,
  TRGB,
} from '../../utils/colors';
import {
  TRGBAData,
 ERGBADataIndex,
} from '../../utils/canvas-context';

import './style/index.scss';

type TPathToPNG = string;
export interface IProps {
  src: TPathToPNG;
}

export type TThresholdFunction = (
  x: number,
  y: number,
  data: TRGBAData
) => boolean;
const alphaThreshold: TThresholdFunction = (
  x: number,
  y: number,
  data: TRGBAData
): boolean => {
  return data[ERGBADataIndex.A] > 0;
};

const useCanvas = (
  url: TPathToPNG,
  trim: boolean = false,
  color: TRGB = 0,
  thresholdColor: TThresholdFunction = alphaThreshold
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
          bottomTrim: for (let r = img.height; --r >= 0; ) {
            // row by row
            for (let c = 0; c < img.width; c++) {
              // columns
              const data = context?.getImageData(c, r, 1, 1, {
                colorSpace: 'srgb',
              });
              if (data && data.data && data.data[3] === 255) {
                trimBottom = r + 1;
                console.log(data.data);
                break bottomTrim;
              }
            }
          }
          let trimTop = -1;
          topTrim: for (
            let r = 0;
            r < (trimBottom !== -1 ? trimBottom : img.height);
            r++
          ) {
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
            const newHeight =
              (trimBottom !== -1 ? trimBottom : img.height) -
              Math.max(trimTop, 0);
            canvas.height = newHeight;

            context?.clearRect(0, 0, img.width, img.height);
            context?.drawImage(
              img,
              0,
              Math.max(trimTop, 0),
              img.width,
              newHeight,
              0,
              0,
              img.width,
              newHeight
            );
          }
        }
        // paint it
        if (context) {
          const { width, height } = canvas;
          const imageData = context.getImageData(0, 0, width, height);
          const fillData = rgbToChannels(color);

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const pos = y * width + x;

              const paint = thresholdColor(x, y, [
                imageData.data[pos * 4 + ERGBADataIndex.R],
                imageData.data[pos * 4 + ERGBADataIndex.G],
                imageData.data[pos * 4 + ERGBADataIndex.B],
                imageData.data[pos * 4 + ERGBADataIndex.A],
              ]);
              if (paint) {
                imageData.data[pos * 4 + ERGBADataIndex.R] =
                  fillData[ERGBADataIndex.R];
                imageData.data[pos * 4 + ERGBADataIndex.G] =
                  fillData[ERGBADataIndex.G];
                imageData.data[pos * 4 + ERGBADataIndex.B] =
                  fillData[ERGBADataIndex.B];
              }
            }
          }
          // set
          context.putImageData(imageData, 0, 0);
        }
      };
      img.onerror = console.error;
    }
    return () => {};
  }, [img, url, trim, color, thresholdColor]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({ src }: IProps): JSX.Element => {
  const canvas2Ref = useCanvas(src, true);

  return (
    <div className='SilhouetteImage'>
      <canvas ref={canvas2Ref} className='SilhouetteImage_silhouette' />
    </div>
  );
};

export default SilhouetteImage;
