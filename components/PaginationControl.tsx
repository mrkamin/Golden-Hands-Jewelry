
const PaginationControl = ({
    currentPage,
    setCurrentPage,
    totalPages,
    getVisiblePageNumbers,
}: {
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        totalPages: number;
        getVisiblePageNumbers: () => number[];
}) => {
  return (
    <div className='mt-6 mb-6 flex justify-center space-x-2'>
        {currentPage > 1 && (
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 cursor-pointer"
            onClick={() => setCurrentPage((prev) => Math.max(prev -1, 1))}
          >
            «
          </button>
        )}
        {getVisiblePageNumbers().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded cursor-pointer
              transition-all duration-500 ease-in-out 
              ${ page === currentPage 
              ? 'bg-yellow-600 text-white' 
              : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className='px-3 py-1 rounded bg-gray-200 text-gray-800 cursor-pointer'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
             »
          </button>
        )}
      </div>
  )
}

export default PaginationControl
