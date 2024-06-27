import { Input, InputRef, Tag, theme } from 'antd';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

`use client`;
export type TagInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export function TagInput(props: TagInputProps) {
  const { token } = theme.useToken();
  const { value, onChange } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  const tags = value ?? [];

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    onChange?.(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      onChange?.([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
  };

  const forMap = (tag: string) => (
    <Tag
      key={tag}
      closable
      style={tagPlusStyle}
      onClose={(e) => {
        e.preventDefault();
        handleClose(tag);
      }}
    >
      {tag}
    </Tag>
  );

  const tagChild = tags.map(forMap);

  return (
    <div className="flex flex-wrap text-sm">
      <div>{tagChild}</div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag
          onClick={showInput}
          style={tagPlusStyle}
          className="border-dashed flex items-center gap-[2px]"
        >
          <Plus size={16} /> New Tag
        </Tag>
      )}
    </div>
  );
}
