import React, { useCallback, useEffect, useMemo } from 'react';

export const Demo = () => {
  const test = useCallback(() => {
    const p = Promise.resolve('hahha');
  }, []);

  useEffect(() => {
    console.log('init');
  }, []);

  return useMemo(() => {
    return (
      <div className="comp-demo">this is a Demo Component</div>
    );
  }, []);
};

export default Demo;
