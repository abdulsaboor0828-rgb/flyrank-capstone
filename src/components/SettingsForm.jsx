import { useState } from 'react';
import FormField from './FormField';
import Toggle from './Toggle';
import SettingsSection from './SettingsSection';
import '../styles/settings.css';

const INITIAL_SETTINGS = {
  displayName: 'Alex Rivera',
  email: 'alex@example.com',
  bio: 'Frontend developer building responsive web experiences.',
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  theme: 'system',
  language: 'en',
  timezone: 'America/New_York',
};

function validateSettings(values) {
  const errors = {};

  if (!values.displayName.trim()) {
    errors.displayName = 'Display name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.bio.length > 200) {
    errors.bio = 'Bio must be 200 characters or fewer.';
  }

  return errors;
}

function SettingsForm() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [savedSettings, setSavedSettings] = useState(INITIAL_SETTINGS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setStatus(null);
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
    const validationErrors = validateSettings(settings);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    setSavedSettings(settings);
    setErrors({});
    setStatus({ type: 'success', message: 'Settings saved successfully.' });
  }

  function handleReset() {
    setSettings(savedSettings);
    setErrors({});
    setStatus(null);
  }

  return (
    <div className="settings">
      <div className="settings__header">
        <h1 className="settings__title">Settings</h1>
        <p className="settings__subtitle">
          Manage your profile, notifications, and preferences.
        </p>
      </div>

      {status && (
        <div
          className={`settings__status settings__status--${status.type}`}
          role="status"
        >
          {status.message}
        </div>
      )}

      <form className="settings__form" onSubmit={handleSubmit} noValidate>
        <SettingsSection
          title="Profile"
          description="Update your public profile information."
        >
          <FormField
            id="displayName"
            label="Display name"
            error={errors.displayName}
          >
            <input
              id="displayName"
              type="text"
              className="form-input"
              value={settings.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              autoComplete="name"
            />
          </FormField>

          <FormField id="email" label="Email" error={errors.email}>
            <input
              id="email"
              type="email"
              className="form-input"
              value={settings.email}
              onChange={(e) => updateField('email', e.target.value)}
              autoComplete="email"
            />
          </FormField>

          <FormField
            id="bio"
            label="Bio"
            hint={`${settings.bio.length}/200 characters`}
            error={errors.bio}
          >
            <textarea
              id="bio"
              className="form-input form-input--textarea"
              rows={3}
              value={settings.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              maxLength={200}
            />
          </FormField>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose how you want to be notified."
        >
          <Toggle
            id="emailNotifications"
            label="Email notifications"
            description="Receive updates about your account via email."
            checked={settings.emailNotifications}
            onChange={(value) => updateField('emailNotifications', value)}
          />
          <Toggle
            id="pushNotifications"
            label="Push notifications"
            description="Get real-time alerts in your browser."
            checked={settings.pushNotifications}
            onChange={(value) => updateField('pushNotifications', value)}
          />
          <Toggle
            id="weeklyDigest"
            label="Weekly digest"
            description="A summary of activity delivered every Monday."
            checked={settings.weeklyDigest}
            onChange={(value) => updateField('weeklyDigest', value)}
          />
        </SettingsSection>

        <SettingsSection
          title="Preferences"
          description="Customize your experience."
        >
          <FormField id="theme" label="Theme">
            <select
              id="theme"
              className="form-input form-input--select"
              value={settings.theme}
              onChange={(e) => updateField('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System default</option>
            </select>
          </FormField>

          <FormField id="language" label="Language">
            <select
              id="language"
              className="form-input form-input--select"
              value={settings.language}
              onChange={(e) => updateField('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </FormField>

          <FormField id="timezone" label="Timezone">
            <select
              id="timezone"
              className="form-input form-input--select"
              value={settings.timezone}
              onChange={(e) => updateField('timezone', e.target.value)}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </FormField>
        </SettingsSection>

        <div className="settings__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleReset}
            disabled={!isDirty}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={!isDirty}>
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
