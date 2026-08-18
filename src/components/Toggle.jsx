function Toggle({ id, label, description, checked, onChange }) {
  return (
    <div className="toggle">
      <div className="toggle__text">
        <label htmlFor={id} className="toggle__label">
          {label}
        </label>
        {description && <p className="toggle__description">{description}</p>}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        className={`toggle__switch${checked ? ' toggle__switch--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}

export default Toggle;
