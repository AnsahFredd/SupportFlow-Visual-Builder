import { useRef, useState } from 'react';
import type { FlowNode, FlowNodeType } from '../types/flow';
import { getNextNode, getStartNode, isLeafNode } from '../utils/flowGraph';

type PreviewModeProps = {
  nodes: FlowNode[];
  onBackToEditor: () => void;
};

type ChatMessage = {
  id: number;
  role: 'bot' | 'user';
  text: string;
};

type PathStep = {
  id: number;
  type: FlowNodeType;
  text: string;
  answer?: string;
};

export function PreviewMode({ nodes, onBackToEditor }: PreviewModeProps) {
  const startNode = getStartNode(nodes);
  const idCounter = useRef(0);
  const nextId = () => {
    idCounter.current += 1;
    return idCounter.current;
  };

  const buildInitialMessages = (): ChatMessage[] =>
    startNode ? [{ id: nextId(), role: 'bot', text: startNode.text }] : [];

  const buildInitialSteps = (): PathStep[] =>
    startNode
      ? [{ id: nextId(), type: startNode.type, text: startNode.text }]
      : [];

  const [currentNode, setCurrentNode] = useState<FlowNode | null>(startNode);
  const [messages, setMessages] = useState<ChatMessage[]>(buildInitialMessages);
  const [steps, setSteps] = useState<PathStep[]>(buildInitialSteps);
  const [blocked, setBlocked] = useState(false);
  const [showPathMobile, setShowPathMobile] = useState(false);

  const handleRestart = () => {
    setCurrentNode(startNode);
    setMessages(buildInitialMessages());
    setSteps(buildInitialSteps());
    setBlocked(false);
  };

  const handleSelectOption = (optionLabel: string) => {
    if (!currentNode) {
      return;
    }

    const nextNode = getNextNode(nodes, currentNode.id, optionLabel);

    setSteps((current) =>
      current.map((step, index) =>
        index === current.length - 1 ? { ...step, answer: optionLabel } : step,
      ),
    );

    setMessages((current) => [
      ...current,
      { id: nextId(), role: 'user', text: optionLabel },
    ]);

    if (!nextNode) {
      return;
    }

    // A gated node is only reachable if its keyword appears in the answer.
    if (nextNode.advancedLogic && nextNode.condition) {
      const conditionMet = optionLabel
        .toLowerCase()
        .includes(nextNode.condition.toLowerCase());

      if (!conditionMet) {
        setBlocked(true);
        return;
      }
    }

    setMessages((current) => [
      ...current,
      { id: nextId(), role: 'bot', text: nextNode.text },
    ]);
    setSteps((current) => [
      ...current,
      { id: nextId(), type: nextNode.type, text: nextNode.text },
    ]);
    setCurrentNode(nextNode);
  };

  const reachedEnd = !blocked && isLeafNode(currentNode);
  const showOptions = !blocked && !reachedEnd && currentNode != null;

  return (
    <div className="preview-shell">
      <header className="preview-topbar">
        <div className="preview-topbar__brand">
          <span className="brand__mark" aria-hidden="true">
            SF
          </span>
          SupportFlow
        </div>
        <div className="preview-topbar__actions">
          <button
            className="secondary-button"
            type="button"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={onBackToEditor}
          >
            Back to Editor
          </button>
        </div>
      </header>

      <div className="preview-body">
        <section className="chat-panel" aria-label="Chat preview">
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-message--${message.role}`}
              >
                {message.role === 'bot' && (
                  <span className="chat-message__avatar" aria-hidden="true">
                    SF
                  </span>
                )}
                <div className="chat-message__bubble">{message.text}</div>
              </div>
            ))}
          </div>

          {showOptions && currentNode.options.length > 0 && (
            <div className="chat-options" aria-label="Answer options">
              {currentNode.options.map((option) => (
                <button
                  key={`${option.nextId}-${option.label}`}
                  className="chat-option-btn"
                  type="button"
                  onClick={() => handleSelectOption(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {blocked && (
            <>
              <p className="chat-end-message">
                No matching path found for your answer.
              </p>
              <button
                className="chat-restart-btn"
                type="button"
                onClick={handleRestart}
              >
                Restart Conversation
              </button>
            </>
          )}

          {reachedEnd && (
            <>
              <p className="chat-end-message">
                End of conversation flow reached.
              </p>
              <button
                className="chat-restart-btn"
                type="button"
                onClick={handleRestart}
              >
                Restart Conversation
              </button>
            </>
          )}

          <button
            className="chat-show-path-btn"
            type="button"
            onClick={() => setShowPathMobile((value) => !value)}
          >
            {showPathMobile ? 'Hide Path' : 'Show Path'}
          </button>
        </section>

        <aside
          className={[
            'path-panel',
            showPathMobile ? 'path-panel--open-mobile' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label="Execution path"
        >
          <h2 className="path-panel__title">Execution Path</h2>
          <p className="path-panel__subtitle">Steps taken through the flow</p>

          <div className="path-steps">
            {steps.map((step, index) => (
              <div className="path-step" key={step.id}>
                <div className="path-step__line-col">
                  <span className="path-step__dot" aria-hidden="true" />
                  {index < steps.length - 1 && (
                    <span className="path-step__connector" aria-hidden="true" />
                  )}
                </div>
                <div className="path-step__content">
                  <p className="path-step__label">{step.type}</p>
                  <p className="path-step__text">{step.text}</p>
                  {step.answer && (
                    <p className="path-step__answer">Answer: {step.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
