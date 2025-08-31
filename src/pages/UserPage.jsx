import Users from '@/containers/UserContainer/Users'
import UsersContextProvider from '@/contexts/UsersContext'
import React from 'react'

const UserPage = () => {
  return (
    <UsersContextProvider>
      <Users />
    </UsersContextProvider>
  )
}

export default UserPage