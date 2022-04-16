import { useEffect, useMemo, useRef } from 'react';
import {
  rgbToChannels,
  TRGB,
} from '../../utils/colors';
import {
  TRGBAData,
  ERGBADataIndex,
  trim,
  TThresholdFunction,
} from '../../utils/canvas-context';

import './style/index.scss';
import { IProps, TPathToPNG } from './types';


const alphaThreshold: TThresholdFunction = (
  x: number,
  y: number,
  data: TRGBAData
): boolean => {
  return data[ERGBADataIndex.A] > 0;
};

const useCanvas = (
  url: TPathToPNG,
  crop: boolean = false,
  color: TRGB = Number.MIN_SAFE_INTEGER,
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

        if (crop && context) {
          const cropRect = trim(context, alphaThreshold);

          if (!cropRect.isEmpty()) {
            // set new, cropped size
            canvas.width = cropRect.width;
            canvas.height = cropRect.height;

            // clear existing data
            context.clearRect(0, 0, img.width, img.height);

            // paint cropped image
            context.drawImage(img,
              cropRect.x, cropRect.y, cropRect.width, cropRect.height,
              0, 0, cropRect.width, cropRect.height);
          }
        }

        // paint it
        if (context) {
          const { width, height } = canvas;
          const imageData = context.getImageData(0, 0, width, height);
          const fillData = color === Number.MIN_SAFE_INTEGER ? [] : rgbToChannels(color);

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const pos = y * width + x;

              const paint = thresholdColor(x, y, [
                imageData.data[pos * 4 + ERGBADataIndex.R],
                imageData.data[pos * 4 + ERGBADataIndex.G],
                imageData.data[pos * 4 + ERGBADataIndex.B],
                imageData.data[pos * 4 + ERGBADataIndex.A],
              ]);
              if (paint && fillData.length > 0) {
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
    return () => { };
  }, [img, url, crop, color, thresholdColor]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({ src, color }: IProps): JSX.Element => {
  const canvas2Ref = useCanvas(src, true, color);

  return (
    <div className='SilhouetteImage'>
      <canvas ref={canvas2Ref} className='SilhouetteImage_silhouette' />
    </div>
  );
};

export default SilhouetteImage;
