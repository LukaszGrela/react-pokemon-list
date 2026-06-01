import './style/index.scss';
import React, { useEffect, useRef } from 'react';
import { rgbToChannels, type TRGB } from '../../utils/colors';
import {
  type TRGBAData,
  ERGBADataIndex,
  trim,
  type TThresholdFunction,
} from '../../utils/canvas-context';

import type { IProps, TPathToPNG } from './types';

const alphaThreshold: TThresholdFunction = (
  _x: number,
  _y: number,
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
}: TUseCanvasParams): React.RefObject<HTMLCanvasElement | null> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = useRef(new Image());

  useEffect(() => {
    img.current.setAttribute('crossOrigin', 'anonymous');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 96;
      canvas.height = 96;

      const context = canvas.getContext('2d');
      img.current.src = url;

      img.current.onload = function imageLoaded(): void {
        canvas.width = img.current.width;
        canvas.height = img.current.height;
        context?.drawImage(img.current, 0, 0);

        if (crop && context) {
          const cropRect = trim(context, alphaThreshold);

          if (!cropRect.isEmpty()) {
            // set new, cropped size
            canvas.width = cropRect.width;
            canvas.height = cropRect.height;

            // clear existing data
            context.clearRect(0, 0, img.current.width, img.current.height);

            // paint cropped image
            context.drawImage(
              img.current,
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
        img.current.onerror = errorHandler;
      }
    }
    return () => {};
  }, [img, url, crop, color, thresholdColor, errorHandler]);

  return canvasRef;
};

const SilhouetteImage: React.FC<IProps> = ({ src, color, onError }: IProps) => {
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
