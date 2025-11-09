import { render, screen } from '@testing-library/react';
import React from 'react';

function Dummy() {
	return <div>unit-ready</div>;
}

describe('unit test runner', () => {
	it('renders a dummy component', () => {
		render(<Dummy />);
		expect(screen.getByText('unit-ready')).toBeInTheDocument();
	});
});


