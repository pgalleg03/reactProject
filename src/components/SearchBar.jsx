import { HiOutlineMagnifyingGlass } from "react-icons/hi2"; //icon import

const CustomerSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          width: '50%',
          backgroundColor: '#fff'
        }}
      >
        <HiOutlineMagnifyingGlass
          data-testid="search-icon"
          style={{ marginRight: '8px', fontSize: '20px', color: '#888' }}
        />
        <input
          type="text"
          placeholder="Search by ID, First Name, Last Name, or Email"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            width: '100%',
            backgroundColor: 'transparent'
          }}
        />
      </div>
    </div>
  );
};

export default CustomerSearchBar;

//everyone needs to npm install react icons