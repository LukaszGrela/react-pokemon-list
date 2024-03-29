import React, { useEffect, useMemo, useRef } from 'react';
import { rgbToChannels, TRGB } from '../../utils/colors';
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
type TUseCanvasParams = {
  url: TPathToPNG;
  crop?: boolean;
  color?: TRGB;
  thresholdColor?: TThresholdFunction;
  errorHandler?: (error: unknown) => void;
};
const useCanvas = ({
  url,
  crop = false,
  color = Number.MIN_SAFE_INTEGER,
  thresholdColor = alphaThreshold,
  errorHandler,
}: TUseCanvasParams): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = useMemo(() => new global.Image(), []);

  img.setAttribute('crossOrigin', 'anonymous');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 96;
      canvas.height = 96;

      const context = canvas.getContext('2d');
      img.src = url;

      img.onload = function imageLoaded(): void {
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
            context.drawImage(
              img,
              cropRect.x,
              cropRect.y,
              cropRect.width,
              cropRect.height,
              0,
              0,
              cropRect.width,
              cropRect.height
            );
          }
        }

        // paint it
        const fillData =
          color === Number.MIN_SAFE_INTEGER ? [] : rgbToChannels(color);
        if (context && fillData.length > 0) {
          const { width, height } = canvas;
          const imageData = context.getImageData(0, 0, width, height);

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const pos = y * width + x;

              if (
                thresholdColor(x, y, [
                  imageData.data[pos * 4 + ERGBADataIndex.R],
                  imageData.data[pos * 4 + ERGBADataIndex.G],
                  imageData.data[pos * 4 + ERGBADataIndex.B],
                  imageData.data[pos * 4 + ERGBADataIndex.A],
                ])
              ) {
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
      if (errorHandler) {
        img.onerror = errorHandler;
      }
    }
    return () => {};
  }, [img, url, crop, color, thresholdColor, errorHandler]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({
  src,
  color,
  onError,
}: IProps): JSX.Element => {
  const canvas2Ref = useCanvas({
    url: src,
    crop: true,
    color,
    thresholdColor: alphaThreshold,
    errorHandler: onError,
  });

  return (
    <div className="SilhouetteImage">
      <canvas ref={canvas2Ref} className="SilhouetteImage_silhouette" />
    </div>
  );
};

export default SilhouetteImage;
