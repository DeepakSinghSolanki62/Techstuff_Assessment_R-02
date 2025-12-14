const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-secondary"
      >
        Previous
      </button>

      <div className="flex justify-center gap-1 ">
        Page
        <span className="text-primary font-semibold">{currentPage}</span>
        of
        <span className="text-primary font-semibold"> {totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-primary"
      >
        Next
      </button>
    </div>
  );
}
export default Pagination