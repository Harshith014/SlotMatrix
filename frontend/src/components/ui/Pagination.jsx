import Button from "./Button";

function Pagination({
  currentPage,

  totalPages,

  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from(
        {
          length: totalPages,
        },

        (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "primary" : "secondary"}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ),
      )}

      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
