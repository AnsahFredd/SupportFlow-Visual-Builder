import { CONNECTOR_STROKE_WIDTH } from '../constants/flow';
import type { FlowEdge, FlowNode } from '../types/flow';
import {
  buildConnectorPath,
  getConnectorMidpoint,
  getNodeAnchorPoints,
} from '../utils/connectors';
import { getNodeById } from '../utils/flowGraph';

type FlowConnectorsProps = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
};

export function FlowConnectors({
  nodes,
  edges,
  selectedNodeId,
}: FlowConnectorsProps) {
  return (
    <svg
      className="flow-connectors"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="connector-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="var(--color-connector-active)"
            stopOpacity="0.9"
          />
          <stop
            offset="100%"
            stopColor="var(--color-primary)"
            stopOpacity="0.55"
          />
        </linearGradient>
        <marker
          id="connector-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path
            d="M1 1 L7 4 L1 7"
            fill="none"
            stroke="var(--color-connector-active)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </marker>
      </defs>

      {edges.map((edge) => {
        const sourceNode = getNodeById(nodes, edge.sourceId);
        const targetNode = getNodeById(nodes, edge.targetId);

        if (!sourceNode || !targetNode) {
          return null;
        }

        const sourceAnchor = getNodeAnchorPoints(sourceNode).bottom;
        const targetAnchor = getNodeAnchorPoints(targetNode).top;
        const path = buildConnectorPath(sourceAnchor, targetAnchor);
        const midpoint = getConnectorMidpoint(sourceAnchor, targetAnchor);
        const isHighlighted =
          selectedNodeId === edge.sourceId || selectedNodeId === edge.targetId;

        return (
          <g
            key={edge.id}
            className={[
              'flow-connector',
              isHighlighted ? 'flow-connector--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <path
              className="flow-connector__shadow"
              d={path}
              fill="none"
              strokeWidth={CONNECTOR_STROKE_WIDTH + 4}
            />
            <path
              className="flow-connector__line"
              d={path}
              fill="none"
              markerEnd="url(#connector-arrow)"
              strokeWidth={CONNECTOR_STROKE_WIDTH}
            />
            <g transform={`translate(${midpoint.x}, ${midpoint.y})`}>
              <rect
                className="flow-connector__label-bg"
                x={-((edge.label.length * 5.2 + 20) / 2)}
                y={-12}
                width={edge.label.length * 5.2 + 20}
                height={24}
                rx={12}
              />
              <text
                className="flow-connector__label"
                textAnchor="middle"
                dy="4"
              >
                {edge.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
