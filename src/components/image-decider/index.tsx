import { FC } from 'react'

type Prop = {
  name: string
}

export function selectImage (name: string) {
  if(name === 'iPhone XR'.toLowerCase()) return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_300,w_210/v1622490473/Iphones/IPHONEX-ATT_n7ihff.jpg';

  if(name === 'iPhone 7'.toLowerCase()) return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_210,w_300/v1622491865/Iphones/IPHONEX-UNL_xgkt1b.png';

  if(name === 'iPhone 6S Plus'.toLowerCase()) return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_300,w_210/v1622492539/Iphones/IPHONES__oublbr.png';

  if(name === 'iPhone XS Max'.toLowerCase()) return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_300,w_210/v1622493805/Iphones/IPHONE_MAX_s8qmiq.webp';

  if(name === 'iPhone XS'.toLowerCase()) return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_300,w_210/v1622495351/Iphones/IPHONE_IOS_t0vdtc.jpg';

  return 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_300,w_250/v1622496154/Iphones/IPHONE_XR__bacvbd.webp';
}

const ImageDecider: FC<Prop> = ({ name }) => {
  const src = selectImage(name);
  return (
    <img src={src} alt={name} height='100' width='80'style={{borderRadius: '2px'}}/>
  )
}

export default ImageDecider;
