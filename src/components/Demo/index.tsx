import React, { useMemo } from 'react';

export const Demo = () => {
  return useMemo(() => {
    return (
      <div className="comp-demo">this is a Demo Component</div>
    );
  }, []);
};

export default Demo;


