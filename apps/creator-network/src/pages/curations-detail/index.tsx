import { useParams } from "react-router-dom";
import { CurationDetail } from "./CurationDetail";
import { useGetCurationById } from "@repo/ui/asset";

const CurationsDetailPage = () => {
  const { curationId } = useParams();
  const { data, loading } = useGetCurationById(curationId ?? "");
  if (loading) return <div>Loading...</div>;
  return (
    data && (
      <div className="w-full h-full">
        <CurationDetail curation={data} />
      </div>
    )
  );
}

export default CurationsDetailPage