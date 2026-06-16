import { useCallback, useMemo, useState } from 'react';
import flowData from '../flow_data.json';
import { FlowCanvas } from './components/FlowCanvas';
import { NodeSettingsPanel } from './components/NodeSettingsPanel';
import { PreviewMode } from './components/PreviewMode';
import type { FlowData, FlowNode } from './types/flow';
import { getEdgesFromNodes, getNodeById } from './utils/flowGraph';

const initialFlow = flowData as FlowData;

function App() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialFlow.nodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const edges = useMemo(() => getEdgesFromNodes(nodes), [nodes]);
  const selectedNode = useMemo(
    () => getNodeById(nodes, selectedNodeId),
    [nodes, selectedNodeId],
  );

  const handleSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleUpdateText = useCallback((nodeId: string, text: string) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId ? { ...node, text } : node,
      ),
    );
  }, []);

  const handleUpdateAdvancedLogic = useCallback(
    (nodeId: string, advancedLogic: boolean, condition: string) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId ? { ...node, advancedLogic, condition } : node,
        ),
      );
    },
    [],
  );

  if (isPreviewMode) {
    return (
      <PreviewMode
        nodes={nodes}
        onBackToEditor={() => setIsPreviewMode(false)}
      />
    );
  }

  return (
    <div className="app">
      <main className="builder-shell" aria-label="SupportFlow visual builder">
        <header className="topbar">
          <div className="topbar__brand-group">
            <div className="brand" aria-label="SupportFlow">
              <span className="brand__mark" aria-hidden="true">
                SF
              </span>
              <div className="brand__text">
                <span className="brand__name">SupportFlow</span>
                <span className="brand__meta">Visual Workflow Builder</span>
              </div>
            </div>
          </div>

          <div className="topbar__center">
            <div className="topbar__workflow" title="Customer Support Flow">
              <span className="topbar__workflow-label">Workflow</span>
              <span className="topbar__workflow-name">
                Customer Support Flow
              </span>
            </div>
            <span className="status-pill status-pill--live">
              <span className="status-pill__dot" aria-hidden="true" />
              Editor
            </span>
          </div>

          <div className="topbar__actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsPreviewMode(true)}
              aria-label="Preview workflow"
              style={{ gap: 'var(--space-2)' }}
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="topbar__preview-icon"
              >
                <path d="M3.5 2.5l9 5.5-9 5.5V2.5z" fill="currentColor" />
              </svg>
              Preview
            </button>
          </div>
        </header>

        <div className="builder-columns">
          <aside className="sidebar" aria-label="Workflow overview">
            <section className="sidebar__hero">
              <h2>Flow Overview</h2>
              <p>
                {nodes.length} nodes connected across your support decision
                tree.
              </p>
            </section>

            <section
              className="sidebar__section"
              aria-labelledby="legend-heading"
            >
              <h2 className="sidebar__heading" id="legend-heading">
                Node Types
              </h2>
              <div className="legend-list">
                <div className="legend-item">
                  <span className="status-dot status-dot--start" />
                  <span className="legend-item__label">Start</span>
                </div>
                <div className="legend-item">
                  <span className="status-dot status-dot--question" />
                  <span className="legend-item__label">Question</span>
                </div>
                <div className="legend-item">
                  <span className="status-dot status-dot--end" />
                  <span className="legend-item__label">End</span>
                </div>
              </div>
            </section>

            <section
              className="sidebar__section"
              aria-labelledby="tips-heading"
            >
              <h2 className="sidebar__heading" id="tips-heading">
                Quick Tips
              </h2>
              <ul className="tip-list">
                <li>Click a node to edit its question text.</li>
                <li>Follow connector labels to trace customer paths.</li>
                <li>Click Preview to test the bot.</li>
              </ul>
            </section>
          </aside>

          <section className="canvas-area" aria-label="Workflow canvas">
            <div className="canvas-stage">
              <FlowCanvas
                nodes={nodes}
                edges={edges}
                selectedNodeId={selectedNodeId}
                onSelectNode={handleSelectNode}
              />
            </div>
            <div className="canvas-badge" aria-hidden="true">
              {edges.length} connections
            </div>
          </section>

          <NodeSettingsPanel
            selectedNode={selectedNode}
            onClose={handleClosePanel}
            onUpdateText={handleUpdateText}
            onUpdateAdvancedLogic={handleUpdateAdvancedLogic}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
