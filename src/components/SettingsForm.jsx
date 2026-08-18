import { useState } from 'react';
import FormField from './FormField';
import '../styles/settings.css';

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  password: '',
};

export function validateSettingsForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSuccessMessage('');
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateSettingsForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});
    setSuccessMessage('Settings saved successfully');
  }

  return (
    <div className="settings">
      <div className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__subtitle">Update your account details.</p>
      </div>

      {successMessage && (
        <div className="settings__status settings__status--success" role="status">
          {successMessage}
        </div>
      )}

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <FormField id="fullName" label="Full name" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-input"
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            required
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            value={values.password}
            onChange={(event) => updateField('password', event.target.value)}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            required
          />
        </FormField>

        <div className="settings__actions">
          <button type="submit" className="btn btn--primary">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
