import React from 'react';
import { RiLoader4Fill } from "react-icons/ri";
import UserItemComponent from './UserItemComponent';
import { UserType } from '../types';

type indexProps = {
    users: UserType[],
    selectedIds: number[],
    isLoading: boolean,
    updateSelectUsers: (value: number[] | 'all' | 'none') => void,
    updateUser: (action: 'edit' | 'delete', id: number, member?: UserType) => void
};

const index:React.FC<indexProps> = ({ users, updateSelectUsers, selectedIds, isLoading, updateUser }) => {
    
    const selectAll = (e: any) => {
        const { target : { checked: selectAllFlag } } = e;
        if (selectAllFlag && users.length) {
            updateSelectUsers('all')
        } else {
            updateSelectUsers('none')
        }
    }
    
      const selectUser = (isChecked: boolean, memberId: number) => {
          if (isChecked) {
            updateSelectUsers([...selectedIds, memberId])
          } else {
            updateSelectUsers(selectedIds.filter(id => id !== memberId))
          }
      }
    
    return <section className="flex-grow">
        <table className="table-fixed w-full">
            <thead>
                <tr className="border-b border-gray-300">
                    <th className='pl-2 md:pl-4 pt-2 pb-4 w-[8%] md:w-[10%] text-left'>
                        {users.length ? <input checked={selectedIds.length === users.length ? true : false} type='checkbox' onChange={selectAll}/> : ''}
                    </th>
                    <th className='pt-2 pb-4 w-[25%] text-left'>Name</th>
                    <th className='pt-2 pb-4 w-[30%] text-left'>Email</th>
                    <th className='pt-2 pb-4 w-[15%]'>Role</th>
                    <th className='pt-2 pb-4 w-[20%]'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading && users.map(member => {
                    const isSelectedRow = selectedIds.includes(member.id);
                    return (<UserItemComponent member={member} key={member.id} isSelectedRow={isSelectedRow} selectUser={selectUser} updateUser={updateUser} />)
                })}
            </tbody>
        </table>
        {(users.length === 0) ? 
            <div className='flex justify-center items-center w-full mt-12'>
                { isLoading ? 
                    <RiLoader4Fill className='animate-spin text-4xl text-[#2A90FF]' />
                : 
                    <p className='text-lg text-gray-600'>No users found</p>
                }
            </div>
        : ''}
    </section>
}
export default index;