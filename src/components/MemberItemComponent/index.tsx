import React, { useState } from 'react';
import { MemberType } from '../../types/memberType';
import { RiDeleteBin7Line, RiEditBoxLine } from 'react-icons/ri';

type indexProps = {
    member: MemberType,
    isSelectedRow: boolean,
    selectMember: (isChecked: boolean, id: number) => void,
    updateMember: (action: 'edit' | 'delete', id: number, member?: MemberType) => void
};

const index:React.FC<indexProps> = ({ member, isSelectedRow, selectMember, updateMember }) => {

    const [ memberValue, setMemberValue ] = useState(member);
    const [ isErrorInput, setIsErrorInput ] = useState<boolean>(false);
    const { id, name, role, email } = memberValue;
    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const editButtonClass = `cursor-pointer rounded-full text-xs font-medium py-0.5 px-2 outline-none`;
    const errorClass = isErrorInput ? 'border-red-500' : 'border-gray-400';

    const onUpdateMember = () => {
        if(name.length > 0 && email.length > 0 && role.length > 0) {
            setIsEditing(false);
            setIsErrorInput(false);
            updateMember('edit', id,memberValue);
        }else {
            setIsErrorInput(true);
        }
    }

    const onCancelUpdate = () => {
        setMemberValue(member);
        setIsEditing(false);
    }
    
    return <tr key={id} className={`border-b border-gray-300 text-gray-900 ${isSelectedRow ? 'bg-gray-200' : ''}`}>
            <td className='pl-4 h-[58px] w-[10%]'><input type='checkbox' checked={isSelectedRow} onChange={(e) => selectMember(e.target.checked, id)}/></td>
            <td className='text-left h-[58px] w-[25%]'>
                {isEditing ? 
                    <input className={`outline-none w-[90%] border ${errorClass}`} type='text' defaultValue={name} onChange={(e) => setMemberValue({...memberValue, name: e.target.value})} /> 
                : 
                    name
                }
            </td>
            <td className='text-left h-[58px] w-[30%]'>
                {isEditing ? 
                    <input className={`outline-none w-[90%] border ${errorClass}`} type='text' defaultValue={email} onChange={(e) => setMemberValue({...memberValue, email: e.target.value})} /> 
                : 
                    email
                }
            </td>
            <td className='text-center h-[58px] w-[15%]'>
                {isEditing ? 
                <select className="outline-none" name="role" id="role-select" defaultValue={role} onChange={(e) => setMemberValue({...memberValue, role: e.target.value})}>
                    <option value="admin">admin</option>
                    <option value="member">member</option>
                </select> 
                : 
                    role
                }
            </td>
            <td className='text-center h-[58px] pr-2 w-[20%]'>
                <div className='flex justify-center gap-2'>
                    {isEditing ?
                        <>
                            <button className={`save bg-[#2A90FF] text-gray-50 hover:bg-[#2a91ff] border border-[#2A90FF] ${editButtonClass}`} onClick={onUpdateMember}>Save</button>
                            <button className={`cancel bg-gray-50 text-gray-800 hover:bg-gray-200 border border-gray-300 ${editButtonClass}`} onClick={onCancelUpdate}>Cancel</button>
                        </>
                    : 
                    <>
                        <button className='edit outline-none mr-4 cursor-pointer'><RiEditBoxLine className='text-blue-500' onClick={() => setIsEditing(true)} /></button>
                        <button className='delete outline-none cursor-pointer'><RiDeleteBin7Line className='text-red-500' onClick={() => updateMember('delete', id)}/></button>
                    </>
                    }
                </div>
            </td>
        </tr>
}
export default index;