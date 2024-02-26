import * as React from 'react';

// 参考：https://github.com/streamich/react-use/blob/master/src/useMount.ts
export const useMount = (fn: () => void) => {
  React.useEffect(() => {
    fn();
  }, []);
};
