import { useEffect, useMemo, useState } from "react";
import { CurationCreateModal } from "./CurationCreateModal";
import { useSearchParams } from "react-router-dom";
import {
  useAssetHub,
  useGetCurations,
} from "@repo/ui/asset";
import { Button, List } from "antd";
import { useGoCreator, useGoCuration } from "../../utils/route";
import { CurationItem } from "./CurationItem";
import Typography from "antd/es/typography";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useAccount } from "wagmi";

const { Title } = Typography;

const CurationsPage = () => {
  const { hubInfo } = useAssetHub();
  const [searchParams, setSearchParams] = useSearchParams();
  const { goCuration } = useGoCuration();
  const { goCreator } = useGoCreator();
  const account = useAccount();

  const [createIsOpen, setCreateIsOpen] = useState(
    searchParams.get("create") === "true"
  );

  const { data, loading } = useGetCurations();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setCreateIsOpen(true);
    } else {
      setCreateIsOpen(false);
    }
  }, [searchParams]);

  const idAdmin = useMemo(() => {
    if (hubInfo?.admin && account?.address && hubInfo?.admin === account?.address) {
      return true
    }
    return false
  }, [account?.address, hubInfo])

  return (
    <div className="w-full h-full">
      <h2 className="mb-4">
        <div className="frc-between">
          <Title level={2}>策展管理</Title>
          {idAdmin && <Button disabled={!idAdmin} type="primary" icon={<PlusSquareOutlined />} onClick={goCreator}>创建资产</Button>}
        </div>
      </h2>
      <List
        dataSource={data}
        grid={{ column: 4, gutter: 12, xs: 2, sm: 3 }}
        rowKey={(item) => item.id}
        loading={loading}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item
            colStyle={{ display: "flex", height: "100%" }}
            className="w-full"
          >
            <CurationItem curation={item} key={item.id} />
          </List.Item>
        )}
      ></List>
      <CurationCreateModal
        open={createIsOpen}
        onFinish={(curationId: bigint) => {
          setCreateIsOpen(false);
          goCuration(curationId.toString());
        }}
        onCancel={() => {
          setCreateIsOpen(false);
          setSearchParams({});
        }}
      />
    </div>
  );
}

export default CurationsPage