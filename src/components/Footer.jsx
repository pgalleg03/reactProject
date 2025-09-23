
const Footer = ({ currentPage, totalPages, nextPage, previousPage }) => {
  return (
    <div>
      <div>
        <button disabled={currentPage === 1} onClick={previousPage}>{'<'}</button>
        <span> {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={nextPage}>{'>'}</button>
      </div>
    </div>
  );
};

export default Footer;