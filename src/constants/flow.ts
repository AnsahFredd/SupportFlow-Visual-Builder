import type { FlowNodeType } from '../types/flow';

export const NODE_WIDTH = 220;
export const NODE_MIN_HEIGHT = 112;
export const NODE_HEADER_HEIGHT = 32;

export const CANVAS_WIDTH = 1400;
export const CANVAS_HEIGHT = 900;
export const CANVAS_PADDING = 60;

export const CONNECTOR_STROKE_WIDTH = 2;
export const CONNECTOR_HANDLE_SIZE = 10;
export const CONNECTOR_CURVE_OFFSET = 96;

export const INITIAL_APP_MODE = 'editor';

export const NODE_TYPE_LABELS: Record<FlowNodeType, string> = {
  start: 'Start Node',
  question: 'Question Node',
  end: 'End Node',
};

export const NODE_TYPE_CLASS_NAMES: Record<FlowNodeType, string> = {
  start: 'flow-node--start',
  question: 'flow-node--question',
  end: 'flow-node--end',
};
