import React from 'react';
import { MemberType } from '../../types/memberType';
import { RiLoader4Fill } from "react-icons/ri";
import MemberItemComponent from '../MemberItemComponent';

type indexProps = {
    members: MemberType[],
    selectedIds: number[],
    isLoading: boolean,
    updateSelectMembers: (value: number[] | 'all' | 'none') => void,
    updateMember: (action: 'edit' | 'delete', id: number, member?: MemberType) => void
};

const index:React.FC<indexProps> = ({ members, updateSelectMembers, selectedIds, isLoading, updateMember }) => {
    
    const selectAll = (e: any) => {
        const { target : { checked: selectAllFlag } } = e;
        if (selectAllFlag && members.length) {
            updateSelectMembers('all')
        } else {
            updateSelectMembers('none')
        }
    }
    
      const selectMember = (isChecked: boolean, memberId: number) => {
          if (isChecked) {
            updateSelectMembers([...selectedIds, memberId])
          } else {
            updateSelectMembers(selectedIds.filter(id => id !== memberId))
          }
      }
    
    return <section className="flex-grow">
        <table className="table-fixed w-full">
            <thead>
                <tr className="border-b border-gray-300">
                    <th className='pl-4 pt-2 pb-4 w-[10%] text-left'>
                        {members.length ? <input checked={selectedIds.length === members.length ? true : false} type='checkbox' onChange={selectAll}/> : ''}
                    </th>
                    <th className='pt-2 pb-4 w-[25%] text-left'>Name</th>
                    <th className='pt-2 pb-4 w-[30%] text-left'>Email</th>
                    <th className='pt-2 pb-4 w-[15%]'>Role</th>
                    <th className='pt-2 pb-4 w-[20%]'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading && members.map(member => {
                    const isSelectedRow = selectedIds.includes(member.id);
                    return (<MemberItemComponent member={member} key={member.id} isSelectedRow={isSelectedRow} selectMember={selectMember} updateMember={updateMember} />)
                })}
            </tbody>
        </table>
        {(members.length === 0) ? 
            <div className='flex justify-center items-center w-full mt-12'>
                { isLoading ? 
                    <RiLoader4Fill className='animate-spin text-4xl text-[#2A90FF]' />
                : 
                    <p className='text-lg text-gray-600'>No members found</p>
                }
            </div>
        : ''}
    </section>
}
export default index;