import { NODE_TYPE_LABELS } from '../constants/flow';
import type { FlowNode } from '../types/flow';

type NodeSettingsPanelProps = {
  selectedNode: FlowNode | null;
  onClose: () => void;
  onUpdateText: (nodeId: string, text: string) => void;
};

export function NodeSettingsPanel({
  selectedNode,
  onClose,
  onUpdateText,
}: NodeSettingsPanelProps) {
  return (
    <aside
      className={[
        'settings-panel',
        selectedNode ? 'settings-panel--open' : 'settings-panel--empty',
      ].join(' ')}
      aria-label="Node settings"
    >
      <div className="settings-panel__header">
        <div>
          <p className="settings-panel__eyebrow">Inspector</p>
          <h2 className="settings-panel__title">Node Settings</h2>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          disabled={!selectedNode}
        >
          ×
        </button>
      </div>

      {selectedNode ? (
        <>
          <div className="settings-panel__body">
            <div className="settings-panel__badge-row">
              <span
                className={`settings-badge settings-badge--${selectedNode.type}`}
              >
                {NODE_TYPE_LABELS[selectedNode.type]}
              </span>
              <span className="settings-panel__node-id">
                ID {selectedNode.id}
              </span>
            </div>

            <div className="field">
              <label htmlFor="node-type">Node Type</label>
              <select id="node-type" value={selectedNode.type} disabled>
                <option value="start">Start Node</option>
                <option value="question">Question Node</option>
                <option value="end">End Node</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="node-message">Question Text</label>
              <textarea
                id="node-message"
                value={selectedNode.text}
                onChange={(event) =>
                  onUpdateText(selectedNode.id, event.target.value)
                }
                placeholder="Enter the message customers will see..."
                rows={5}
              />
              <p className="field__hint">
                Changes apply instantly on the canvas.
              </p>
            </div>

            {selectedNode.options.length > 0 && (
              <div className="field">
                <span className="field__label">Answer Branches</span>
                <ul className="branch-list">
                  {selectedNode.options.map((option) => (
                    <li key={`${option.nextId}-${option.label}`}>
                      <span className="branch-list__label">{option.label}</span>
                      <span className="branch-list__target">
                        → Node {option.nextId}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="settings-panel__footer">
            <p className="settings-panel__footer-note">
              Edits are kept in memory for this session.
            </p>
          </div>
        </>
      ) : (
        <div className="settings-panel__empty">
          <div className="settings-panel__empty-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <rect
                x="8"
                y="10"
                width="32"
                height="28"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 20h16M16 26h10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3>Select a node</h3>
          <p>
            Click any card on the canvas to edit its question text and review
            branch connections.
          </p>
        </div>
      )}
    </aside>
  );
}
