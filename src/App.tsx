import { useEffect, useState } from 'react';
import './App.css'
import fetchMembers from './api/fetchMembers';
import MembersListComponent from './components/MembersListComponent';
import PaginationComponent from './components/PaginationComponent';
import SearchComponent from './components/SearchComponent';
import { MemberType } from './types/memberType';

const NO_OF_MEMBERS_PER_PAGE = 10;
const DEFAULT_PAGE_NUMBER = 1;

function App() {

  const [ members, setMembers ] = useState<MemberType[]>([]);
  const [ pageNumber, setPageNumber ] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [ searchText, setSearchText ] = useState<string>('');
  const [ selectedIds, setSelectedIds ] = useState<number[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  const onSearchTextUpdate = (text: string) => {
    setSearchText(text);
    setPageNumber(1);
  }

  const filteredMembers = members.filter(member => (
    member.name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.email.toLowerCase().includes(searchText.toLowerCase()) ||
    member.role.toLowerCase().includes(searchText.toLowerCase())
  ))
  const noOfPages = filteredMembers.length ? Math.ceil(filteredMembers.length/NO_OF_MEMBERS_PER_PAGE) : 0;
  const currentMembersList = filteredMembers.slice((pageNumber - 1) * NO_OF_MEMBERS_PER_PAGE, pageNumber * NO_OF_MEMBERS_PER_PAGE);

  useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const json = await fetchMembers();
      if (!ignore) {
        setMembers(json.data || []);
        setIsLoading(false);
      }
    }
  
    startFetching();
  
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setSelectedIds([])
  }, [searchText, pageNumber])

  const updateSelectMembers = (selectedValues: number[] | 'all' | 'none') => {
    if (selectedValues === 'all') {
        setSelectedIds(currentMembersList.map(member => member.id))
    } else if (selectedValues === 'none') {
        setSelectedIds([])
    } else {
        setSelectedIds(selectedValues)
    }
  }

  const onClickDeleteSelected = () => {
    setMembers(members.filter(member => !selectedIds.includes(member.id)));
    if(currentMembersList.length === selectedIds.length) {
      setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
    }
    setSelectedIds([])
  }

  const updateMember = (action: 'edit' | 'delete', id: number, member?: MemberType) => {
    switch (action) { 
      case 'delete':
        setMembers(members.filter(value => value.id !== id));
        if(currentMembersList.length === 1 && currentMembersList[0].id === id) {
          setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
        }
        break;
      case 'edit': 
        member && setMembers(members.map(value => id === value.id ? member : value));
        break;
      default:
        break;
    }
  }

  return (
    <main className="flex flex-col items-center w-full px-12 py-8 gap-6 h-screen">
      <SearchComponent searchText={searchText} setSearchText={onSearchTextUpdate} />
      <MembersListComponent members={currentMembersList} updateSelectMembers={updateSelectMembers} selectedIds={selectedIds} isLoading={isLoading} updateMember={updateMember} />
      <PaginationComponent pageNumber={pageNumber} setPageNumber={setPageNumber} noOfPages={noOfPages} onClickDeleteSelected={onClickDeleteSelected} />
    </main>
  )
}

export default App
