import { useGetAssetTagNames } from "@repo/ui/asset";
import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TagGroup } from "./TagGroup";

type AssetsTagsProps = {
  onChange: (tags: string[]) => void;
}

const AssetsTags: FC<AssetsTagsProps> = (props) => {
  const { onChange } = props;
  const { data } = useGetAssetTagNames(undefined, 20);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tags = searchParams.get("tags");
    return tags ? tags.split(",") : [];
  });

  const tags = useMemo(
    () => data?.map((t) => ({ label: t.name, value: t.name })),
    [data]
  );

  useEffect(() => {
    if (selectedTags.length > 0) {
      setSearchParams({ ...searchParams, tags: selectedTags.join(",") });
    } else {
      searchParams.delete("tags");
      setSearchParams({ ...searchParams });
    }
    onChange(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (selectedTags.join(",") === searchParams.get("tags")) {
      return;
    }
    setSelectedTags(() => {
      const tags = searchParams.get("tags");
      return tags ? tags.split(",") : [];
    });
  }, [searchParams]);

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="mr-2">Filter by tags(top 20):</span>
        <TagGroup
          tags={tags}
          selectedTags={selectedTags}
          onChange={(tags) => setSelectedTags(tags)}
        ></TagGroup>
      </div>
    </div>
  );
}

export default AssetsTags;