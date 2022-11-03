const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <div style={{ color: color, backgroundColor: bcg }}>
      <div>
        <span>{count}</span>
        <span>{icon}</span>
      </div>
      <h5>{title}</h5>
    </div>
  );
};
export default StatItem;
