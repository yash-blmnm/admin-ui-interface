import React from 'react';
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

type indexProps = {
    pageNumber: number, 
    setPageNumber: React.Dispatch<React.SetStateAction<number>>, 
    noOfPages: number,
    onClickDeleteSelected: () => void,
};

const index:React.FC<indexProps> = ({ pageNumber, setPageNumber, noOfPages, onClickDeleteSelected }) => {
    
    const splPageClass = "flex justify-center items-center w-6 h-6 md:w-9 md:h-9 border rounded-full text-sm outline-none"
    const prevPageClass = `${splPageClass} ${pageNumber === 1 ? 'text-gray-400 bg-gray-200 border-gray-400' : 'bg-[#2A90FF] text-gray-50 border-[#2A90FF] cursor-pointer'}`
    const nextPageClass = `${splPageClass} ${pageNumber === noOfPages ? 'text-gray-400 bg-gray-200 border-gray-400' : 'bg-[#2A90FF] text-gray-50 border-[#2A90FF] cursor-pointer'}`
    
    return <section className="flex flex-col md:flex-row justify-center gap-4 pb-2 w-full">
        <button className='justify-start py-2 px-4 bg-red-500 text-gray-50 hover:bg-red-500 hover:cursor-pointer rounded-full text-sm font-medium' onClick={onClickDeleteSelected}>Delete Selected</button>
        <div className="flex-grow">
            <nav className="flex justify-center items-center gap-3 md:gap-5">
                {noOfPages > 1 ? 
                    <>
                        {noOfPages > 2 ? <button 
                            onClick={() => pageNumber > 1 && setPageNumber(1)} 
                            className={`first-page ${prevPageClass}`}
                        >
                            <RiArrowLeftDoubleLine className='text-sm' />
                        </button> : ''}
                        <button 
                            onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                            className={`previous-page ${prevPageClass}`}
                        >
                            <RiArrowLeftSLine className='text-sm' />
                        </button>
                    </>
                : '' }
                {Array(noOfPages).fill(null).map((_, index) => 
                    <button 
                        className={`${index}-page ${splPageClass} border-[#2A90FF] cursor-pointer ${pageNumber === index + 1 ? 'text-[#2A90FF] bg-gray-50' : 'bg-[#2A90FF] text-gray-50'}`} 
                        key={index + 1} 
                        onClick={() => setPageNumber(index + 1)}
                    >
                        {index + 1}
                    </button>
                )}
                {noOfPages > 1 ? 
                    <>
                    <button 
                        onClick={() => pageNumber < noOfPages && setPageNumber(pageNumber + 1)}
                        className={`next-page ${nextPageClass}`}
                    >
                        <RiArrowRightSLine className='text-sm' />
                    </button>
                    {noOfPages > 2 ? <button 
                        onClick={() => pageNumber < noOfPages && setPageNumber(noOfPages)}
                        className={`last-page ${nextPageClass}`}
                    >
                        <RiArrowRightDoubleLine className='text-sm' />
                    </button> : ''}
                    </>
                : '' }
            </nav>
        </div>
    </section>
}
export default index;