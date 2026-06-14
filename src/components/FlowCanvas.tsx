import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/flow';
import type { FlowEdge, FlowNode } from '../types/flow';
import { FlowConnectors } from './FlowConnectors';
import { FlowNodeCard } from './FlowNodeCard';

type FlowCanvasProps = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
};

export function FlowCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
}: FlowCanvasProps) {
  return (
    <div className="canvas-viewport">
      <div
        className="canvas-board"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        <FlowConnectors
          nodes={nodes}
          edges={edges}
          selectedNodeId={selectedNodeId}
        />

        <div className="flow-nodes-layer">
          {nodes.map((node) => (
            <FlowNodeCard
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={onSelectNode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
