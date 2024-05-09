import { Button, ButtonProps } from "antd";
import { MouseEvent } from "react";

export type TagItemProps = Omit<ButtonProps, "onClick" | "onChange"> & {
  onChange?: (check: boolean, e: MouseEvent) => void;
  checked?: boolean;
};

export function TagItem(props: TagItemProps) {
  const { onChange, checked, ...rest } = props;
  return (
    <Button
      type={checked ? "primary" : "default"}
      {...rest}
      onClick={(e) => {
        onChange?.(!checked, e);
      }}
    />
  );
}

export type TagGroupProps = {
  tags?: Array<{ label: string; value: string }>;
  selectedTags?: string[];
  onChange?: (tags: string[]) => void;
};

export function TagGroup(props: TagGroupProps) {
  const { tags, selectedTags, onChange } = props;

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {tags &&
        tags.map((t) => (
          <TagItem
            key={t.value}
            checked={selectedTags?.includes(t.value)}
            onChange={(check, e) => {
              if (e.ctrlKey) {
                onChange?.(
                  check
                    ? [...(selectedTags ?? []), t.value]
                    : selectedTags?.filter((s) => s !== t.value) ?? []
                );
              } else {
                onChange?.(check ? [t.value] : []);
              }
            }}
          >
            {t.label}
          </TagItem>
        ))}
    </div>
  );
}