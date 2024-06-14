import { indexerClient } from '@/app/_creatornetwork';
import { TwitterOutlined, DiscordOutlined } from '@ant-design/icons'

export async function TopAuthors() {
  const studios = await indexerClient.assetHubs.fetchAssetHubs(undefined, 5);
  return <div className="flex flex-col gap-4">
    {studios.map(s => {
      return <div className="flex gap-4 items-center">
        <div className="avatar placeholder">
          <div className="bg-[#00AAA1] text-white rounded-full w-16">
            <span className="text-xl">{s.name[0]}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span>{s.name}</span>
          <span className="text-sm line-clamp-1 text-gray-400">Fashion designer, Blogger, activist</span>
          <div className="flex gap-2">
            <TwitterOutlined />
            <DiscordOutlined />
          </div>
        </div>
      </div>
    })}
  </div>
}