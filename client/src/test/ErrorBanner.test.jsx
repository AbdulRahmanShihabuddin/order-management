import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBanner from '../components/ErrorBanner';

describe('ErrorBanner', () => {
  it('renders title and message', () => {
    render(<ErrorBanner title="Checkout Failed" message="Network timeout." />);
    expect(screen.getByText('Checkout Failed')).toBeInTheDocument();
    expect(screen.getByText('Network timeout.')).toBeInTheDocument();
  });

  it('renders retry button when action provided', () => {
    const handler = vi.fn();
    render(<ErrorBanner title="Error" message="msg" actionLabel="Retry" onAction={handler} />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });
});
