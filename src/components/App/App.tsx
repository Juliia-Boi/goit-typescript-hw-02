import { useEffect, useState } from "react";
import { searchImg } from "../image-api";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Image } from "../types";

export default function App() {
  const [photos, setPhotos] = useState<Image[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(999);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topic) return;

    async function getPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await searchImg(topic, page);

        if (res.photos.length === 0) {
          toast.error("No images found for this query.");
          setError("No images found for this query.");
          return;
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...res.photos]);
        setTotalPages(res.totalPages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError("Something went wrong");
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, [topic, page]);

  const handleSearchSubmit = (newTopic: string) => {
    if (newTopic.trim() === "") {
      toast.error("Please enter a valid search query!");
      setError("Please enter a valid search query!");
      return;
    }

    setTopic(newTopic);
    setPage(1);
    setPhotos([]);
    setError(null);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image: Image) => {
    setSelectedPhoto(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchSubmit} />
      <Toaster position="top-right" />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {photos.length > 0 && (
        <>
          <ImageGallery images={photos} onImageClick={openModal} />
          {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      <ImageModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        selectedImage={selectedPhoto}
      />
    </div>
  );
}
