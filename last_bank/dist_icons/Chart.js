import * as React from "react";

const SvgChart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={48} width={48} {...props}>
    <path d="M8 40V24h7v16Zm12.5 0V8h7v32ZM33 40V18h7v22Z" />
  </svg>
);

export default SvgChart;
