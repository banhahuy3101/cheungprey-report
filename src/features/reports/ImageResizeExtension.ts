import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/react";

/**
 * A custom TipTap extension that allows images to be:
 * - Resized by dragging the bottom-right corner handle
 * - Deleted by dragging the image outside the editor area
 *
 * Usage:
 *   import { ResizableImage } from "@/features/reports/ImageResizeExtension";
 *   extensions: [ResizableImage]
 */
export const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      title: { default: "" },
      width: { default: "100%" },
      height: { default: null },
      "data-resized": { default: "false" },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "resizable-image-wrapper", style: "display:inline-block;position:relative;" },
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          draggable: "true",
          style: `max-width:100%;height:auto;display:block;width:${HTMLAttributes.width || "100%"};cursor:grab;`,
        }),
      ],
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      container.className = "resizable-image-wrapper";
      container.style.cssText = "display:inline-block;position:relative;";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.draggable = true;
      img.style.cssText = `max-width:100%;height:auto;display:block;width:${node.attrs.width || "100%"};cursor:grab;user-select:none;`;

      container.appendChild(img);

      // Resize handle (bottom-right corner)
      const handle = document.createElement("div");
      handle.className = "resize-handle";
      handle.style.cssText = `
        position:absolute; bottom:0; right:0; width:14px; height:14px;
        background:#3b82f6; border:2px solid #fff; border-radius:2px;
        cursor:se-resize; display:none; z-index:10;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      `;
      container.appendChild(handle);

      // Show/hide handle
      const showHandle = () => { handle.style.display = "block"; };
      const hideHandle = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!container.contains(target)) handle.style.display = "none";
      };
      img.addEventListener("click", showHandle);
      document.addEventListener("click", hideHandle);

      // Drag to resize
      let isResizing = false;
      let startX = 0;
      let startW = 0;

      handle.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startW = img.offsetWidth;
        document.body.style.cursor = "se-resize";
        document.body.style.userSelect = "none";
      });

      const onMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;
        const delta = e.clientX - startX;
        const newWidth = Math.max(50, startW + delta);
        img.style.width = `${newWidth}px`;
        const pos = typeof getPos === "function" ? getPos() : undefined;
        if (pos !== undefined) {
          editor.commands.updateAttributes("resizableImage", { width: `${newWidth}px`, "data-resized": "true" });
        }
      };

      const onMouseUp = () => {
        isResizing = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      // ─── Drag-out-to-delete ─────────────────────────────────
      let dragOutCount = 0;
      let isDraggingAway = false;

      const onDragStart = (e: DragEvent) => {
        dragOutCount = 0;
        isDraggingAway = false;
        // Mark this image as being dragged
        e.dataTransfer?.setData("text/plain", "resizable-image");
        e.dataTransfer!.effectAllowed = "move";
        // Store the getPos
        const pos = typeof getPos === "function" ? getPos() : undefined;
        (img as unknown as Record<string, unknown>)._dragPos = pos;
      };

      const onDrag = () => {
        dragOutCount++;
        // After a few drag events, we know the user has started dragging
        if (dragOutCount > 2) isDraggingAway = true;
      };

      const onDragEnd = (e: DragEvent) => {
        if (!isDraggingAway) return;

        // Check if the mouse is outside the editor area
        const editorEl = editor.view.dom;
        const editorRect = editorEl.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const isOutside =
          mouseX < editorRect.left - 20 ||
          mouseX > editorRect.right + 20 ||
          mouseY < editorRect.top - 20 ||
          mouseY > editorRect.bottom + 20;

        if (isOutside) {
          // Delete the image node
          const pos = (img as unknown as Record<string, unknown>)._dragPos as number | undefined;
          if (pos !== undefined) {
            // Find the range of the node and delete it
            const nodeSize = node.nodeSize;
            editor.commands.deleteRange({ from: pos, to: pos + nodeSize });
          } else {
            // Fallback: use the current selection
            editor.commands.deleteSelection();
          }
        }

        isDraggingAway = false;
        dragOutCount = 0;
      };

      img.addEventListener("dragstart", onDragStart);
      img.addEventListener("drag", onDrag);
      img.addEventListener("dragend", onDragEnd);

      return {
        dom: container,
        destroy: () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("click", hideHandle);
          img.removeEventListener("dragstart", onDragStart);
          img.removeEventListener("drag", onDrag);
          img.removeEventListener("dragend", onDragEnd);
        },
      };
    };
  },
});