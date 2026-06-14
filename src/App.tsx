function App() {
  return (
    <div className="app">
      <main className="builder-shell" aria-label="SupportFlow visual builder">
        <header className="topbar">
          <div className="brand" aria-label="SupportFlow">
            <span className="brand__name">SupportFlow</span>
            <span className="brand__meta">v2.4.0</span>
          </div>

          <nav className="topbar__nav" aria-label="Primary navigation">
            <button className="nav-tab nav-tab--active" type="button">
              Workflows
            </button>
            <button className="nav-tab" type="button">
              Integrations
            </button>
          </nav>

          <div className="zoom-controls" aria-label="Canvas view controls">
            <button className="icon-button" type="button" aria-label="Zoom out">
              -
            </button>
            <span>Zoom 100%</span>
            <button className="icon-button" type="button" aria-label="Zoom in">
              +
            </button>
          </div>

          <div className="topbar__actions">
            <button className="secondary-button" type="button">
              Add Node
            </button>
            <button className="primary-button" type="button">
              Preview
            </button>
            <button className="icon-button" type="button" aria-label="Settings">
              ...
            </button>
          </div>
        </header>

        <aside className="sidebar" aria-label="Workflow tools">
          <button className="primary-button" type="button">
            + New Workflow
          </button>

          <section className="sidebar__section" aria-labelledby="nav-heading">
            <h2 className="sidebar__heading" id="nav-heading">
              Navigation
            </h2>
            <div className="sidebar__menu">
              <button
                className="sidebar__menu-item sidebar__menu-item--active"
                type="button"
              >
                Library
              </button>
              <button className="sidebar__menu-item" type="button">
                Variables
              </button>
              <button className="sidebar__menu-item" type="button">
                History
              </button>
              <button className="sidebar__menu-item" type="button">
                Settings
              </button>
            </div>
          </section>

          <section className="sidebar__section" aria-labelledby="nodes-heading">
            <h2 className="sidebar__heading" id="nodes-heading">
              Common Nodes
            </h2>
            <div className="node-palette">
              <button className="palette-item" type="button">
                <span className="status-dot status-dot--start" />
                Start
              </button>
              <button className="palette-item" type="button">
                <span className="status-dot status-dot--question" />
                Question
              </button>
              <button className="palette-item" type="button">
                <span className="status-dot status-dot--end" />
                End
              </button>
            </div>
          </section>
        </aside>

        <section className="canvas-area" aria-label="Workflow canvas">
          <div className="canvas-stage">
            <div className="canvas-empty-state">
              <h1>Visual Workflow Builder</h1>
              <p>
                Design tokens and editor layout are ready for the first flow
                graph feature.
              </p>
            </div>
          </div>

          <div className="floating-controls" aria-label="Canvas quick actions">
            <button className="icon-button" type="button" aria-label="Zoom out">
              -
            </button>
            <button className="icon-button" type="button" aria-label="Zoom in">
              +
            </button>
            <button className="icon-button" type="button" aria-label="Fit view">
              Fit
            </button>
          </div>
        </section>

        <aside className="settings-panel" aria-label="Node settings">
          <div className="settings-panel__header">
            <h2 className="settings-panel__title">Node Settings</h2>
            <button className="icon-button" type="button" aria-label="Close">
              x
            </button>
          </div>

          <div className="settings-panel__body">
            <div className="field">
              <label htmlFor="node-type">Node Type</label>
              <select id="node-type" defaultValue="question">
                <option value="start">Start Node</option>
                <option value="question">Question Node</option>
                <option value="end">End Node</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="node-label">Internal Label</label>
              <input id="node-label" defaultValue="Greeting" type="text" />
            </div>

            <div className="field">
              <label htmlFor="node-message">Message Content</label>
              <textarea
                id="node-message"
                defaultValue="Hello! How can I help you today?"
              />
            </div>
          </div>

          <div className="settings-panel__footer">
            <button className="primary-button" type="button">
              Save Node
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
