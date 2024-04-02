/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

import alignJustify from "@material-design-icons/svg/outlined/format_align_justify.svg?raw";
import alignCenter from "@material-design-icons/svg/outlined/format_align_center.svg?raw";
import format_align_right from "@material-design-icons/svg/outlined/format_align_right.svg?raw";
import format_align_left from "@material-design-icons/svg/outlined/format_align_left.svg?raw";
import strikethrough_s from "@material-design-icons/svg/outlined/strikethrough_s.svg?raw";
import underline from "@material-design-icons/svg/outlined/format_underlined.svg?raw";
import format_italic from "@material-design-icons/svg/outlined/format_italic.svg?raw";
import format_bold from "@material-design-icons/svg/outlined/format_bold.svg?raw";
import redo from "@material-design-icons/svg/outlined/redo.svg?raw";
import undo from "@material-design-icons/svg/outlined/undo.svg?raw";
import { SvgIcon, ToolButton } from "./ToolButton";
import { InsertImageToolButton } from "./ImageButton";
import { InsertVideoToolButton } from "./VideoButton";
import { BlockFormatDropDown } from "./BlockFormat";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isCodeNode } from "@lexical/code";
import { blockTypeToBlockName, rootTypeToRootName } from "./consts";
import { $isTableNode } from "@lexical/table";
import { getSelectedNode } from "../../utils/getSelectedNode";
const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  // const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
  //   null
  // );
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  // const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [rootType, setRootType] =
    useState<keyof typeof rootTypeToRootName>("root");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });
      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      // Update links
      const node = getSelectedNode(selection);

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType("table");
      } else {
        setRootType("root");
      }

      if (elementDOM !== null) {
        // setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            // const language =
            //   element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            // setCodeLanguage(
            //   language ? CODE_LANGUAGE_MAP[language] || language : ""
            // );
            return;
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex gap-1" ref={toolbarRef}>
      <ToolButton
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        title="Undo"
        icon={<SvgIcon svg={undo} />}
      ></ToolButton>
      <ToolButton
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        title="Redo"
        icon={<SvgIcon svg={redo} />}
      />
      <Divider />
      <BlockFormatDropDown
        editor={editor}
        rootType={rootType}
        blockType={blockType}
      />
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        type={isBold ? "primary" : undefined}
        title="Format Bold"
        icon={<SvgIcon svg={format_bold} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        type={isItalic ? "primary" : undefined}
        title="Format Italics"
        icon={<SvgIcon svg={format_italic} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        type={isUnderline ? "primary" : undefined}
        title="Format Underline"
        icon={<SvgIcon svg={underline} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        type={isStrikethrough ? "primary" : undefined}
        title="Format Strikethrough"
        icon={<SvgIcon svg={strikethrough_s} />}
      ></ToolButton>
      <Divider />
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        title="Left Align"
        icon={<SvgIcon svg={format_align_left} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        title="Center Align"
        icon={<SvgIcon svg={alignCenter} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        title="Right Align"
        icon={<SvgIcon svg={format_align_right} />}
      ></ToolButton>
      <ToolButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        title="Justify Align"
        icon={<SvgIcon svg={alignJustify} />}
      ></ToolButton>
      <InsertImageToolButton editor={editor} />
      <InsertVideoToolButton editor={editor} />
    </div>
  );
}
