import { useEffect, useState } from 'react';
import fetchUsers from './api/fetchUsers';
import UserListComponent from './components/UserListComponent';
import PaginationComponent from './components/PaginationComponent';
import SearchComponent from './components/SearchComponent';
import { UserType } from './types';

const NO_OF_MEMBERS_PER_PAGE = 10;
const DEFAULT_PAGE_NUMBER = 1;

function index() {

  const [ users, setUsers ] = useState<UserType[]>([]);
  const [ pageNumber, setPageNumber ] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [ searchText, setSearchText ] = useState<string>('');
  const [ selectedIds, setSelectedIds ] = useState<number[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  const onSearchTextUpdate = (text: string) => {
    setSearchText(text);
    setPageNumber(1);
  }

  const filteredUsers = users.filter(member => (
    member.name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.email.toLowerCase().includes(searchText.toLowerCase()) ||
    member.role.toLowerCase().includes(searchText.toLowerCase())
  ))
  const noOfPages = filteredUsers.length ? Math.ceil(filteredUsers.length/NO_OF_MEMBERS_PER_PAGE) : 0;
  const currentUsersList = filteredUsers.slice((pageNumber - 1) * NO_OF_MEMBERS_PER_PAGE, pageNumber * NO_OF_MEMBERS_PER_PAGE);

  useEffect(() => {
    let ignore = false;
  
    async function startFetching() {
      const json = await fetchUsers();
      if (!ignore) {
        setUsers(json.data || []);
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

  const updateSelectUsers = (selectedValues: number[] | 'all' | 'none') => {
    if (selectedValues === 'all') {
        setSelectedIds(currentUsersList.map(member => member.id))
    } else if (selectedValues === 'none') {
        setSelectedIds([])
    } else {
        setSelectedIds(selectedValues)
    }
  }

  const onClickDeleteSelected = () => {
    setUsers(users.filter(member => !selectedIds.includes(member.id)));
    if(currentUsersList.length === selectedIds.length) {
      setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
    }
    setSelectedIds([])
  }

  const updateUser = (action: 'edit' | 'delete', id: number, member?: UserType) => {
    switch (action) { 
      case 'delete':
        setUsers(users.filter(value => value.id !== id));
        if(currentUsersList.length === 1 && currentUsersList[0].id === id) {
          setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
        }
        break;
      case 'edit': 
        member && setUsers(users.map(value => id === value.id ? member : value));
        break;
      default:
        break;
    }
  }

  return (
    <>
      <SearchComponent searchText={searchText} setSearchText={onSearchTextUpdate} />
      <UserListComponent users={currentUsersList} updateSelectUsers={updateSelectUsers} selectedIds={selectedIds} isLoading={isLoading} updateUser={updateUser} />
      <PaginationComponent pageNumber={pageNumber} setPageNumber={setPageNumber} noOfPages={noOfPages} onClickDeleteSelected={onClickDeleteSelected} />
    </>
  )
}

export default index
