import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  it('shows required-field validation messages when submitted empty', async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);
    const buttons = screen.getAllByRole('button', { name: /save settings/i });
    console.log('BUTTON COUNT:', buttons.length);
    await user.click(buttons[0]);
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.queryByText('Settings saved successfully')).not.toBeInTheDocument();
  });

  it('shows an invalid email message for malformed email', async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Alex Rivera');
    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.queryByText('Settings saved successfully')).not.toBeInTheDocument();
  });

  it('shows a short password message when password is under 8 characters', async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Alex Rivera');
    await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'short');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(screen.queryByText('Settings saved successfully')).not.toBeInTheDocument();
  });

  it('shows a success message on valid submission without reloading', async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), 'Alex Rivera');
    await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText('Settings saved successfully')).toBeInTheDocument();
    expect(screen.queryByText('Full name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });
});
