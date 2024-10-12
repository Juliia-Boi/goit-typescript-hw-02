import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface Image {
  urls: {
    full: string;
  };
  alt_description: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImage: Image | null;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  selectedImage,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
          border: "none",
          background: "transparent",
        },
      }}
    >
      {selectedImage && (
        <img
          src={selectedImage.urls.full}
          alt={selectedImage.alt_description}
          className={css.modalImage}
        />
      )}
    </Modal>
  );
}
