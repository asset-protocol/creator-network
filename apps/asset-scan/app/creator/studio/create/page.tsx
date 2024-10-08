import { StudioCreateForm } from './_components/StudioCreateForm';

export default function Page() {
  return (
    <div className="max-w-[600px] mx-auto border border-solid rounded-sm p-8 flex flex-col gap-4 mt-10">
      <div className="mx-auto text-3xl font-semibold self-center">
        创建您的个人工作室
      </div>
      <div className="text-gray-400">
        <div>
          “工作室”是您展示和管理资产的个人空间。无论您是艺术家、教育家还是创新者，您的“工作室”就是您与世界互动的起点。
        </div>
        <div>
          一旦您的“工作室”创建成功，您就可以开始上传、组织和分享您的资产了。无论是图片、视频、文章还是其他形式的创意作品，您的“工作室”都将是它们的完美家园。开始吧，让世界看到您的才华！
        </div>
      </div>
      <StudioCreateForm />
    </div>
  );
}
