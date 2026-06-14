import type { FlowEdge, FlowNode } from '../types/flow';

export function getNodeById(
  nodes: FlowNode[],
  nodeId: string | null,
): FlowNode | null {
  if (!nodeId) {
    return null;
  }

  return nodes.find((node) => node.id === nodeId) ?? null;
}

export function getStartNode(nodes: FlowNode[]): FlowNode | null {
  return nodes.find((node) => node.type === 'start') ?? nodes[0] ?? null;
}

export function getEdgesFromNodes(nodes: FlowNode[]): FlowEdge[] {
  return nodes.flatMap((node) =>
    node.options.map((option) => ({
      id: `${node.id}-${option.nextId}-${option.label}`,
      sourceId: node.id,
      targetId: option.nextId,
      label: option.label,
    })),
  );
}

export function isLeafNode(node: FlowNode | null): boolean {
  return !node || node.options.length === 0;
}

export function getNextNode(
  nodes: FlowNode[],
  currentNodeId: string,
  optionLabel: string,
): FlowNode | null {
  const currentNode = getNodeById(nodes, currentNodeId);
  const selectedOption = currentNode?.options.find(
    (option) => option.label === optionLabel,
  );

  return getNodeById(nodes, selectedOption?.nextId ?? null);
}
