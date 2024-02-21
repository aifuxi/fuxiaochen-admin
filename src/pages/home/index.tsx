import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import { Empty } from '@douyinfe/semi-ui';

import PageLayout from '@/components/layout/page-layout.tsx';

const HomePage = () => {
  return (
    <PageLayout title="首页">
      <div className="w-full h-full grid place-content-center">
        <Empty
          image={<IllustrationConstruction style={{ width: 300, height: 300 }} />}
          darkModeImage={<IllustrationConstructionDark style={{ width: 300, height: 300 }} />}
          title={'功能建设中'}
          description="当前功能暂未开发完成，敬请期待。"
        />
      </div>
    </PageLayout>
  );
};

export default HomePage;
