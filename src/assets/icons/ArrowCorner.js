const ArrowCorner = ({ props }) => {
  return (
    <svg
    {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4V8C4 8.53043 4.21071 9.03914 4.58579 9.41421C4.96086 9.78929 5.46957 10 6 10H12.6667M12.6667 10L10 7.33333M12.6667 10L10 12.6667"
        stroke="black"
        strokeWidth="0.666667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowCorner;
