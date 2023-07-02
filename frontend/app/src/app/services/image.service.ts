import { Injectable } from '@angular/core';
import { ImageWrapper } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  validImage(img: ImageWrapper): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!img.image) {
        resolve(false);
      }
      const imageUrl = URL.createObjectURL(img.image);
      const image = new Image();
  
      image.src = imageUrl;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
  
        if (width < 100 || width > 300 || height < 100 || height > 300) {
          alert('Maximum image size is 300x300 and minimum size is 100x100!');
          resolve(false);
        } else {
          const extension = this.getFileExtension(img.image.name);
          const validExtensions = ['jpg', 'png'];
          if (!validExtensions.includes(extension)) {
            alert('Invalid file format!');
            resolve(false);
          }
          else {
            resolve(true);
          }
        }
  
        URL.revokeObjectURL(imageUrl);
      };
  
      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  }
  
  imageSelected(event: any, imageHandler: ImageWrapper) {
    if (event.target.value) {
      imageHandler.image = <File>event.target.files[0];
    }
    return this.validImage(imageHandler);
  }

  getFileExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1].toLowerCase();
  }
}
