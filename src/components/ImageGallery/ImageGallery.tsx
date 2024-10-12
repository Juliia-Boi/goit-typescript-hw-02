import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";
import { Image } from "../types";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.imageGallery}>
      {images &&
        images.map((image) => (
          <li key={image.id} className={css.imageGalleryItem}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        ))}
    </ul>
  );
}
