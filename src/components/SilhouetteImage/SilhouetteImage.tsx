import { Image, IProps as IImageProps } from '../Image';

import './style/index.scss'

export interface IProps extends IImageProps {}

const SilhouetteImage: React.FC<IProps> = ({ src }: IProps): JSX.Element => {
  return (
    <div
      className='SilhouetteImage'
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage:`url(${src})`
      }}
    >
      <Image src={src} className='SilhouetteImage_silhouette' />;
    </div>
  );
};

export default SilhouetteImage;
