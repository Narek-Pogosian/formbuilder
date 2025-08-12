export default function Svg() {
  return (
    <svg
      className="pointer-events-none absolute -top-0 -z-20 w-full opacity-20 blur-[80px]"
      viewBox="0 180 700 220"
      fill="none"
      aria-hidden="true"
    >
      <g>
        <path
          d="M100 300 C200 200, 300 200, 400 300 L400 400 L100 400 Z"
          fill="#353458"
        ></path>
        <path
          d="M250 280 C320 200, 420 200, 500 280 L500 400 L250 400 Z"
          fill="#f3f3f3"
        ></path>
        <path
          d="M300 260 C360 180, 460 180, 550 260 L550 400 L300 400 Z"
          fill="#FFB699"
        ></path>
      </g>
    </svg>
  );
}
