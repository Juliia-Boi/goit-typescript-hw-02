import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
