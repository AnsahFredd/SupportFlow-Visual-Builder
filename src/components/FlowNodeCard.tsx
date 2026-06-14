import {
  NODE_TYPE_CLASS_NAMES,
  NODE_TYPE_LABELS,
  NODE_WIDTH,
} from '../constants/flow';
import type { FlowNode } from '../types/flow';
import { estimateNodeHeight } from '../utils/connectors';

type FlowNodeCardProps = {
  node: FlowNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
};

function NodeTypeIcon({ type }: { type: FlowNode['type'] }) {
  if (type === 'start') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 3.5v9l7.5-4.5L4 3.5z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'end') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 8l2.5 2.5L12 5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 4.5h10M3 8h7M3 11.5h5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function FlowNodeCard({
  node,
  isSelected,
  onSelect,
}: FlowNodeCardProps) {
  const height = estimateNodeHeight(node);

  return (
    <button
      type="button"
      className={[
        'flow-node',
        NODE_TYPE_CLASS_NAMES[node.type],
        isSelected ? 'flow-node--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: NODE_WIDTH,
        minWidth: 200,
        minHeight: height,
      }}
      onClick={() => onSelect(node.id)}
      aria-pressed={isSelected}
      aria-label={`${NODE_TYPE_LABELS[node.type]}: ${node.text}`}
    >
      <span className="flow-node__glow" aria-hidden="true" />
      <span className="flow-node__accent" aria-hidden="true" />

      <header className="flow-node__header">
        <span className="flow-node__icon">
          <NodeTypeIcon type={node.type} />
        </span>
        <span className="flow-node__type">{NODE_TYPE_LABELS[node.type]}</span>
        <span className="flow-node__id">#{node.id}</span>
      </header>

      <p className="flow-node__text">{node.text}</p>

      {node.options.length > 0 && (
        <ul className="flow-node__options" aria-label="Branch options">
          {node.options.map((option) => (
            <li key={`${node.id}-${option.nextId}-${option.label}`}>
              <span className="flow-node__option-chip">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
