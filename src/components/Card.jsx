import Icon from "./icon";

function Card({ className, handleClick, no, i }) {
  return (
    <div
      className={className}
      onClick={() => {
        handleClick(i);
      }}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <Icon svgNo={no} />
        </div>
      </div>
    </div>
  );
}
export default Card;
