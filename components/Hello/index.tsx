import React, { FC, useMemo } from 'react';

interface IHelloProps {
  name: string;
}

export const Hello: FC<IHelloProps> = ({ name }) => {
  return useMemo(() => {
    return (
      <div className="comp-hello">hello, {name}</div>
    );
  }, [name]);
};
export default Hello;
