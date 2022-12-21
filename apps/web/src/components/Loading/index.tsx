import React from "react";

import { TailSpin } from "react-loader-spinner";

interface Props {
  height?: number;
  color?: string;
}

const Loading: React.FC<Props> = ({ height = 50 }) => {
  return (
    <div data-testid="loading">
      <TailSpin height={height} width={height} color="#0b4f6c" />
    </div>
  );
};

export default Loading;
