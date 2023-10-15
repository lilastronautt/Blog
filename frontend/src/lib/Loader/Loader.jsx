import "./Loader.css";

const Loader = ({ dimension }) => {
  return (
    <div
      style={{
        height: `${dimension + 1}rem`,
        width: `${dimension + 1}rem`,
      }}
      className="loader_cont"
    >
      <div
        className="loader"
        style={{ height: `${dimension}rem`, width: `${dimension}rem` }}
      ></div>
    </div>
  );
};

export default Loader;
