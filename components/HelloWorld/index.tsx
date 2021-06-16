import React, { FC, useMemo } from 'react';

interface IHelloWorldProps {
  name: string;
}
export const HelloWorld: FC<IHelloWorldProps> = ({ name }) => {
  return useMemo(() => {
    return (
      <div className="hello-world">
        Hello world, {name}
      </div>
    );
  }, [name]);
};

export default HelloWorld;
