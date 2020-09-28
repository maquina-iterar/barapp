import React from "react";

const Location = (props) => {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 13a2.17 2.17 0 01-2.166-2.167c0-1.194.971-2.166 2.166-2.166 1.195 0 2.167.972 2.167 2.166A2.169 2.169 0 0113 13m0-10.833c-4.778 0-8.666 3.85-8.666 8.583 0 5.93 7.636 12.544 7.96 12.822a1.08 1.08 0 001.411 0c.325-.278 7.962-6.892 7.962-12.822 0-4.733-3.888-8.583-8.667-8.583"
        fill="#231F20"
      />
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={4}
        y={2}
        width={18}
        height={22}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 14.083c-2.09 0-3.791-1.7-3.791-3.791S10.909 6.5 13 6.5s3.792 1.7 3.792 3.792c0 2.09-1.701 3.791-3.792 3.791m0-11.916c-4.778 0-8.666 3.85-8.666 8.583 0 5.93 7.636 12.544 7.96 12.822a1.08 1.08 0 001.411 0c.325-.278 7.962-6.892 7.962-12.822 0-4.733-3.888-8.583-8.667-8.583"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <path fill="#0D1C2E" d="M0 0h26v26H0z" />
      </g>
    </svg>
  );
};

export default Location;
