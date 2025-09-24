
const CustomerSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search by ID, First Name, Last Name, or Email"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
    </div>
  );
};

export default CustomerSearchBar;
