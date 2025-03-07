import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

type ImageResizableProps = {
  originalImage: string;
  newImage: string;
} 

const ImageResizable = ({ originalImage, newImage }: ImageResizableProps) => {

  return (
    <ReactBeforeSliderComponent
      firstImage={{ imageUrl: originalImage }}
      secondImage={{ imageUrl: newImage }}
    />
  )

}

export default ImageResizable;