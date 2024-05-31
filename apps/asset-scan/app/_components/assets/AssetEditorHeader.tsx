import { DeleteOutlined } from "@ant-design/icons";
import { useAssetEditor } from "../../../../../packages/react/src/asset/components/_AssetEditor/AssetEditorContext";
import { Button, TextArea, Upload } from "@creator-network/react/ui";
import { replaceUri } from "@creator-network/core";

export function AssetEditorHeader(props: {
  useImage?: boolean;
  descriptonPlaceholder?: string;
}) {
  const { metadata, setMetadata } = useAssetEditor();

  const resValue = metadata ?? {
    name: "",
    title: "",
    description: "",
    image: undefined,
  };
  const image = replaceUri(resValue.image);
  const useImage = props.useImage !== false;

  return (
    <div>
      {useImage && (
        <div className={`relative w-full ${image ? "aspect-[2/1]" : "h-12"}`}>
          {image && (
            <>
              <img
                src={image}
                alt=""
                className="w-full h-full z-[-1] absolute top-0 object-cover rounded-md overflow-hidden"
              />
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white from-0% via-[#fffffff0] via-10%  to-transparent backdrop-blur-md"></div>
            </>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            {image && (
              <Button
                className="text-base aspect-square bg-[#dddddd55] rounded-md py-5 px-4 hover:bg-gray-200 items-center justify-center flex backdrop-blur-md"
                onClick={() => setMetadata({ ...resValue, image: undefined })}
              ><DeleteOutlined /></Button>
            )}
            <Upload
              accept="image/*"
              onChange={(f) => {
                setMetadata({ ...resValue, image: f?.[0] });
              }}
            >
              <Button
                className="text-base bg-[#dddddd55] rounded-md py-5 px-4 hover:bg-gray-200 items-center flex backdrop-blur-md"
              >
                <span className="text-gray-800">Choose a over image</span>
              </Button>
            </Upload>
          </div>
        </div>
      )}
      <div
        className={`${image && useImage ? "px-4 " : ""
          }border-gray-300 border-solid border-0${image && useImage
            ? " -translate-y-32 h-32 flex flex-col justify-center"
            : ""
          }`}
      >
        <TextArea
          placeholder="Input Title"
          className="text-3xl font-bold bg-transparent break-words border-0 focus:border-gray-500 hover:bg-transparent focus:bg-transparent"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
            }
          }}
          value={resValue.name}
          onChange={(e) => {
            setMetadata({ ...resValue, name: e.target.value });
          }}
        ></TextArea>
      </div>
      <div>
        <div className={`${image && useImage ? "-mt-32" : ""}`}>
          {
            <TextArea
              placeholder={props.descriptonPlaceholder ?? "Input Description"}
              className="m-auto text-gray-500 my-4 text-base bg-gray-100 rounded-md py-6 px-6 focus:border-gray-500 hover:bg-gray-100 focus:bg-gray-100"
              value={resValue.description}
              onChange={(e) => {
                setMetadata({ ...resValue, description: e.target.value });
              }}
            ></TextArea>
          }
        </div>
      </div>
    </div>
  );
}
