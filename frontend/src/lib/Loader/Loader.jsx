import "./Loader.css";

const Loader = ({ dimension }) => {
  return (
    <div
      className="loader"
      style={{ height: `${dimension}rem`, width: `${dimension}rem` }}
    ></div>
  );
};

export default Loader;
