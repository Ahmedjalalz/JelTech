'use client';

import { useEffect, useState } from "react";

export const useMotionReady = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
};
