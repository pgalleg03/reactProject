
const Footer = ({ currentPage, totalPages, nextPage, previousPage }) => {
  return (
    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '14px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button disabled={currentPage === 1} onClick={previousPage}>{'<'}</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={nextPage}>{'>'}</button>
      </div>
      <div style={{ color: '#666' }}>
        <p>© {new Date().getFullYear()} Customer Management System. All rights reserved.</p>
        <p>Data displayed is protected and intended for authorized use only. Unauthorized access or distribution is prohibited.</p>
      </div>
    </div>
  );
};

export default Footer;
