export const ExelIcon = ({ size }: { size?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "20"}
      height={size || "18"}
      viewBox="0 0 20 18"
      fill="none"
    >
      <rect x="5" y="0.25" width="15" height="17.5" rx="2" fill="#2FB776" />
      <path
        d="M5 13.375H20V15.75C20 16.8546 19.1046 17.75 18 17.75H7C5.89543 17.75 5 16.8546 5 15.75V13.375Z"
        fill="url(#paint0_linear_337_1376)"
      />
      <rect x="12.5" y="9" width="7.5" height="4.375" fill="#229C5B" />
      <rect x="12.5" y="4.625" width="7.5" height="4.375" fill="#27AE68" />
      <path
        d="M5 2.25C5 1.14543 5.89543 0.25 7 0.25H12.5V4.625H5V2.25Z"
        fill="#1D854F"
      />
      <rect x="5" y="4.625" width="7.5" height="4.375" fill="#197B43" />
      <rect x="5" y="9" width="7.5" height="4.375" fill="#1B5B38" />
      <path
        d="M5 7.625C5 5.96815 6.34315 4.625 8 4.625H9.5C11.1569 4.625 12.5 5.96815 12.5 7.625V12.875C12.5 14.5319 11.1569 15.875 9.5 15.875H5V7.625Z"
        fill="black"
        fillOpacity="0.3"
      />
      <rect
        y="3.375"
        width="11.25"
        height="11.25"
        rx="2"
        fill="url(#paint1_linear_337_1376)"
      />
      <path
        d="M8.125 12.125L6.36383 8.9375L8.04768 5.875H6.67311L5.63359 7.83036L4.61125 5.875H3.19373L4.88617 8.9375L3.125 12.125H4.49957L5.60782 10.0536L6.70747 12.125H8.125Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_337_1376"
          x1="5"
          y1="15.5625"
          x2="20"
          y2="15.5625"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#163C27" />
          <stop offset="1" stopColor="#2A6043" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_337_1376"
          x1="0"
          y1="9"
          x2="11.25"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#185A30" />
          <stop offset="1" stopColor="#176F3D" />
        </linearGradient>
      </defs>
    </svg>
  );
};
