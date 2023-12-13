import React from 'react'

export default function ProfilesDisplay({ profiles }) {
  console.log('profiles: ', profiles)
  const headerHeight = '64px'

  return (
    <div
      className={`mt-[${headerHeight}] overflow-auto p-[20px] flex justify-center items-center`}
    >
      <div className='w-[90%]'>
        <table className='min-w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left p-2'>Index</th>
              <th className='text-left p-2'>Identifier</th>
              <th className='text-left p-2'>Name</th>
              <th className='text-left p-2'>Address</th>
              <th className='text-left p-2'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr key={index} className='border-b'>
                <td className='text-left p-2'>{index + 1}</td>
                <td className='text-left p-2'>{profile.id}</td>
                <td className='text-left p-2'>{profile.name}</td>
                <td className='text-left p-2'>{profile.address}</td>
                <td className='text-left p-2'>{profile.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
