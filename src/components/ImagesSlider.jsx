import { useState, useRef } from "react";


 const ImagesSlider = ({image1 = "./acutal.png", image2 = "./figma.png",}) => {
  const [imageRevealFraq, setImageRevealFraq] = useState(0.5);
  const imageContainer = useRef(null);

  const isMobile = true;
  const resolution = {
    mobile: {w: "360px", h: "760px"},
    desktop: {w: "1600px", h: "900px"}
  }

  const slide = (xPosition) => {
    const containerBoundingRect = imageContainer.current.getBoundingClientRect();
    setImageRevealFraq(() => {
      if (xPosition < containerBoundingRect.left) {
        return 0;
      } else if (xPosition > containerBoundingRect.right) {
        return 1;
      } else {
        return (
          (xPosition - containerBoundingRect.left) / containerBoundingRect.width
        );
      }
    });
  };

  const handleTouchMove = (event) => {
    slide(event.touches.item(0).clientX);
  };

  const handleMouseDown = () => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event) => {
    slide(event.clientX);
  };

  const handleMouseUp = () => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  return (
    <div className="px-4">
      <div
        ref={imageContainer}
        className="mx-auto  relative select-none group"
        style={{
          maxWidth: isMobile ? resolution.mobile.w : resolution.desktop.w,
          maxHeight: isMobile ? resolution.mobile.h : resolution.desktop.h,
        }}
      >
        <img
          src={image1}
          alt=""
          className="pointer-events-none w-full h-full"
        />
        <img
          style={{
            clipPath: `polygon(0 0, ${imageRevealFraq * 100}% 0, ${
              imageRevealFraq * 100
            }% 100%, 0 100%)`,
          }}
          src={image2}
          alt=""
          className="absolute inset-0 pointer-events-none w-full h-full"
        />
        <div
          style={{ left: `${imageRevealFraq * 100}%` }}
          className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
        >
          <div className="relative h-full opacity-50 hover:opacity-100">
            <div className="absolute inset-y-0 bg-white w-0.5 -ml-px"></div>
            <div
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="h-12 w-12 -ml-6 -mt-6 rounded-full bg-white absolute top-1/2 shadow-xl flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 text-gray-400 rotate-90 transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesSlider;

// https://www.youtube.com/watch?v=AZVAAydWTj4