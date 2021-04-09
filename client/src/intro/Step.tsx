import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Step which triggers a callback when it enters/leaves view

type Props = {
  onEnter?: (data: any) => void;
  onLeave?: (data: any) => void;
  data: any;
  children: any;
};

const Step = ({ data, onEnter, onLeave, children }: Props) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // Whether has entered at least once
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      setHasEntered(true);
      if (onEnter) {
        onEnter(data);
      }
    } else if (hasEntered && !inView && onLeave) {
      onLeave(data);
    }
  }, [inView]);

  return (
    <div ref={ref} className="step">
      {children}
    </div>
  );
};

export default Step;
