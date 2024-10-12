import { Formik, Field, Form, FormikHelpers } from "formik";
import { toast } from "react-hot-toast";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import css from "../SearchBar/SearchBar.module.css";

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions: FormikHelpers<{ topic: string }>) => {
          if (values.topic.trim() === "") {
            toast.error("Please enter a search query!");
          } else {
            onSearch(values.topic);
            actions.resetForm();
          }
        }}
      >
        {() => (
          <Form className={css.form}>
            <Field
              autoComplete="off"
              autoFocus
              type="text"
              name="topic"
              className={css.field}
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.iconButton}>
              <TbDeviceDesktopSearch size="28" />
            </button>
          </Form>
        )}
      </Formik>
    </header>
  );
};

export default SearchBar;
