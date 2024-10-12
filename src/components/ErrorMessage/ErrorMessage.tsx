import css from "../ErrorMessage/ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
}
