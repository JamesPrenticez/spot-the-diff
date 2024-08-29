import React, { useState } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import DragDropImage from '../components/Dragdrop';
import ImagesSlider from '../components/ImagesSlider';

const CompareImages = () => {
  const [images, setImages] = useState({ leftImage: "./mobile-actual.png", rightImage: "./mobile-figma.png" });

  return (
    <div>
    {(images.leftImage && images.rightImage) ? (
      <ImagesSlider 
        image1={images.leftImage}
        image2={images.rightImage}
      />
    ) : (
      <DragDropImage 
        images={images} 
        setImages={setImages} 
      />
      )
    }
  </div>

  )
}

export default CompareImages

