import ActionBar from '@/components/popups/common/ActionBar'
import RolePermissions from '@/components/restaurent/admin/RolePermissions'
import RolesList from '@/components/restaurent/admin/RolesList'
import React from 'react'

const RoleandPermissions = () => {
  return (
    <div className="w-full overflow-hidden">
      <ActionBar
       menuTitle= "Permissions"
        onExport={(type) => console.log("Export:", type)}
        onAdd={() => console.log("Add new user")}
      />
      <div className='grid grid-cols-3 gap-5'>
        <RolesList/>
        <RolePermissions/> 
      </div>
    </div>
  )
}

export default RoleandPermissions
