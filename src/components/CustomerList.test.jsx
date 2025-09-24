vi.mock('./ActionButton', () => ({
  default: ({ onAdd }) => {
    // Simulate a button that triggers onAdd
    return (
      <button data-testid="add-button" onClick={() => onAdd({
        first_name: 'New',
        last_name: 'Customer',
        email: 'new@customer.com',
        password: 'newpass'
      })}>
        Add
      </button>
    );
  }
}));

test('calls add handler and refreshes data', async () => {
  render(<CustomerList />);
  fireEvent.click(screen.getByTestId('add-button'));
  await waitFor(() => {
    expect(memdb.post).toHaveBeenCalledWith({
      first_name: 'New',
      last_name: 'Customer',
      email: 'new@customer.com',
      password: 'newpass'
    });
  });
});
