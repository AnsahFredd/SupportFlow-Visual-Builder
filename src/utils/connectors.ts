import {
  CONNECTOR_CURVE_OFFSET,
  NODE_MIN_HEIGHT,
  NODE_WIDTH,
} from '../constants/flow';
import type { FlowNode } from '../types/flow';

export type Point = {
  x: number;
  y: number;
};

const OPTION_ROW_HEIGHT = 30;
const NODE_BODY_BASE_HEIGHT = 76;

export function estimateNodeHeight(node: FlowNode): number {
  const optionsHeight =
    node.options.length > 0 ? node.options.length * OPTION_ROW_HEIGHT + 14 : 0;

  return Math.max(NODE_MIN_HEIGHT, NODE_BODY_BASE_HEIGHT + optionsHeight);
}

export function getNodeAnchorPoints(node: FlowNode): {
  top: Point;
  bottom: Point;
} {
  const height = estimateNodeHeight(node);
  const centerX = node.position.x + NODE_WIDTH / 2;

  return {
    top: { x: centerX, y: node.position.y },
    bottom: { x: centerX, y: node.position.y + height },
  };
}

export function buildConnectorPath(source: Point, target: Point): string {
  const verticalDistance = target.y - source.y;
  const curveOffset = Math.max(
    CONNECTOR_CURVE_OFFSET,
    Math.abs(verticalDistance) * 0.42,
  );

  const controlPoint1Y = source.y + curveOffset;
  const controlPoint2Y = target.y - curveOffset;

  return `M ${source.x} ${source.y} C ${source.x} ${controlPoint1Y}, ${target.x} ${controlPoint2Y}, ${target.x} ${target.y}`;
}

export function getConnectorMidpoint(source: Point, target: Point): Point {
  return {
    x: (source.x + target.x) / 2,
    y: (source.y + target.y) / 2,
  };
}
