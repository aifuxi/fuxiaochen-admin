import { Skeleton } from '@douyinfe/semi-ui';

export const placeholder = (
  <div className="grid grid-cols-1 gap-y-4">
    <div className="grid grid-cols-1 gap-y-3">
      <Skeleton.Title className="w-[120px] h-[30px]" />
      <Skeleton.Title className="w-full h-[40px]" />
    </div>
    <div className="grid grid-cols-1 gap-y-3">
      <Skeleton.Title className="w-[120px] h-[30px]" />
      <Skeleton.Title className="w-full h-[40px]" />
    </div>
    <div className="grid grid-cols-1 gap-y-3">
      <Skeleton.Title className="w-[120px] h-[30px]" />
      <Skeleton.Title className="w-full h-[100px]" />
    </div>
  </div>
);
