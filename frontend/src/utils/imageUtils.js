// BEGIN CODE CITATION
// The following function is not my own
// Code copied from https://github.com/codelikepro22/react-firebase-images-gallery/blob/sixth-part/src/components/crop/utils/cropImage.js
// Description: This function creates a new Image object. Event listeners for 'load' and 'error' are then attached to the Image object. The 'load'
// event listener creates a handler that resolves the returned Promise to the Image object. The 'error' event listener creates a handler that
// rejects the returned Promise with the associated error. The cross origin attribute is set to anonymous to allow sharing of resources across different
// domains. Finally, the image src is set to the provided image URL.
const createImage = (url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
});
// END CODE CITATION

// BEGIN CODE CITATION
// The following function is not my own
// Code copied and modified from https://github.com/codelikepro22/react-firebase-images-gallery/blob/sixth-part/src/components/crop/utils/cropImage.js
// Description: The goal of this function is to take a provided image and crop it based on the pixelCrop parameter representing the cropped area pixels.
// The function begins by creating a new Image object based on the image source and using the createImage function above. A 'canvas' element is created
// and then a 2-dimensional drawing context is created on the 'canvas' element. The canvas height and width are then based on the source image height and 
// width and the image is placed inside the canvas context starting in the upper left-hand corner, i.e., position x = 0, y = 0. Once the source image is 
// placed on the canvas context, the getImageData method is called on the context to extract the image data based on the provided pixelCrop parameter - 
// we extract data based on a distance from the x and y axes and based on a width and height. The canvas is then resized based on the pixelCrop width and 
// height and the extracted image data is then placed on the resized canvas. Finally, a promise is returned that resolves to an object containing the
// cropped image File object and the cropped image URL.
const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      return null;
    }

    canvas.width = image.width;
    canvas.height = image.height;
  
    ctx.drawImage(image, 0, 0);
  
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );
  
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    ctx.putImageData(data, 0, 0);
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        file.name = 'cropped.jpeg';
        resolve({ file: file, url: URL.createObjectURL(file) });
      }, 'image/jpeg');
    });
}
// END CODE CITATION

export { getCroppedImg };
