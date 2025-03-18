import React, { useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";

type indexProps = {
    searchText: string
    setSearchText: (value: string) => void
};

const index:React.FC<indexProps> = ({ searchText, setSearchText }) => {

    const [ searchValue, setSearchValue ] = useState<string>('')

    const onSearch = (e: any) => {
        const { value } = e.target;
        setSearchValue(value);
    }
    
    return <form className="w-full" onSubmit={(e) => {e.preventDefault(); setSearchText(searchValue)}}>
        <div className="flex items-center gap-4 w-full border border-gray-300 rounded-sm px-4 py-2">
            <input 
                type="text" 
                className="flex-grow outline-none" 
                value={searchValue}
                onChange={onSearch} 
                id="search-bar" 
                placeholder="Search by name, email, or role" 
            />
            {searchText.length ? 
                <button>
                    <RiCloseLine className='text-gray-400 cursor-pointer outline-none' onClick={() => {setSearchValue(''); setSearchText('')}}/>
                </button> 
            : ''}
            <button type='submit' className="search-icon outline-none cursor-pointer" onClick={() => setSearchText(searchValue)} >
                <RiSearchLine className="text-xl text-[#2A90FF]" />
            </button>
        </div>
    </form>
}
export default index;