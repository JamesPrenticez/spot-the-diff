import React, { useState } from 'react';

const DragDropImage = ({images, setImages}) => {


  const handleDrop = (e, side) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (side === 'left') {
          setImages((prevImages) => ({ ...prevImages, leftImage: reader.result }));
        } else {
          setImages((prevImages) => ({ ...prevImages, rightImage: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative w-full h-full flex justify-center items-center">

          <div className="flex w-full h-full">
            <div
              className="w-1/2 h-full border-r-2 border-gray-300 flex justify-center items-center"
              onDrop={(e) => handleDrop(e, 'left')}
              onDragOver={handleDragOver}
            >
              {images.leftImage ? (
                <img src={images.leftImage} alt="Left Upload" className="max-h-full max-w-full" />
              ) : (
                <p className="text-gray-500">Drag & Drop an image here (Left)</p>
              )}
            </div>
            <div
              className="w-1/2 h-full border-l-2 border-gray-300 flex justify-center items-center"
              onDrop={(e) => handleDrop(e, 'right')}
              onDragOver={handleDragOver}
            >
              {images.rightImage ? (
                <img src={images.rightImage} alt="Right Upload" className="max-h-full max-w-full" />
              ) : (
                <p className="text-gray-500">Drag & Drop an image here (Right)</p>
              )}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default DragDropImage;
