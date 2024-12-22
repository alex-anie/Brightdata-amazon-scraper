import React from 'react'

export default function Roaming() {
  return (
    <main className='bg-slate-500/80 w-screen h-screen flex justify-center items-center z-50 absolute inset-0 overflow-hidden'>
        <div className='flex justify-center flex-col items-center'>
            <div id='loaders-romaing' className=''></div>
            <p className='italic text-white'>Pleace wait! Brightdata is scraping data from Amazon</p>
        </div>
    </main>
  )
}

