import React from 'react';
import { render, fireEvent, rerender} from '@testing-library/react';
import ContactForm from './ContactForm';

test('Renders form labels to the screen', () => {
  const { getByText } = render(<ContactForm />);

  getByText(/first name/i);
  getByText(/last name/i);
  getByText(/email/i);
  getByText(/message/i);
});

test('Render form inputs to the screen', () => {
  const { getByLabelText } = render(<ContactForm />);

  getByLabelText(/first name/i);
  getByLabelText(/last name/i);
  getByLabelText(/email/i);
  getByLabelText(/message/i);
});

test('Fill out form', () => {
  const { getByLabelText, getByTestId } = render(<ContactForm />);

  const first = getByLabelText(/first name/i);
  const last = getByLabelText(/last name/i);
  const email = getByLabelText(/email/i);
  const message = getByLabelText(/message/i);

  fireEvent.change(first, {target: {value: "New"}});
  fireEvent.change(last, {target: {value: "Name"}});
  fireEvent.change(email, {target: {value: "new@name.com"}});
  fireEvent.change(message, {target: {value: "No message"}});

  expect(first.value).toBe("New");
  expect(last.value).toBe("Name");
  expect(email.value).toBe("new@name.com");
  expect(message.value).toBe("No message");
});

test('First name input error', () => {
  const { getByText, getByTestId, rerender } = render(<ContactForm />);

  const submit = getByText(/submit/i);
  const div = getByTestId("firstDiv");
  const errors = getByTestId("firstError");

  fireEvent.click(submit);

  rerender(<ContactForm />);
  expect(div).toContain(errors);
})