import React, { useEffect, useMemo } from 'react';

export const Demo = () => {
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
