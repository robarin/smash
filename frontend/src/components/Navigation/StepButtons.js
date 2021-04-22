import React from 'react';

const StepButtons = ({onNext, onPrevious, finish}) => {
  return (
    <div className="sm:px-6 flex justify-between">
      {onPrevious
        ? (<button type="button"
                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                   onClick={onPrevious}>
          Back
        </button>)
        : <div></div>
      }
      {onNext
        ? (<button type="button"
                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                   onClick={onNext}>
          {finish ? 'Finish' : 'Next'}
        </button>)
        : <div></div>
      }
    </div>
  )
}

export default StepButtons;
