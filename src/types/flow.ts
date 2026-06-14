export type FlowNodeType = 'start' | 'question' | 'end';

export type AppMode = 'editor' | 'preview';

export type FlowNodePosition = {
  x: number;
  y: number;
};

export type FlowOption = {
  label: string;
  nextId: string;
};

export type FlowNode = {
  id: string;
  type: FlowNodeType;
  text: string;
  position: FlowNodePosition;
  options: FlowOption[];
};

export type FlowMeta = {
  theme: string;
  canvas_size: {
    w: number;
    h: number;
  };
};

export type FlowData = {
  meta: FlowMeta;
  nodes: FlowNode[];
};

export type FlowEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
};

export type FlowAppState = {
  mode: AppMode;
  nodes: FlowNode[];
  selectedNodeId: string | null;
  currentPreviewNodeId: string | null;
};
