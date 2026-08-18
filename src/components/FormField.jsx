function FormField({ id, label, error, children }) {
  return (
    <div className={`form-field${error ? ' form-field--error' : ''}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      {children}
      {error && (
        <p className="form-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
