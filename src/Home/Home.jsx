import React, { useState } from 'react'

function Home() {
    const [items,setItems]=useState([1,2,3,4,5,6])
  return (
    <div className='flex justify-center bg-gray-100 h-lvh w-full' style={{fontFamily:'ropa sans'}}>
        <div className='flex flex-col w-full h-full'>
            <div className='flex w-full justify-center px-3 mt-5'><input className='w-full rounded-lg p-2 border-[#F39C12] border shadow bg-transparent' type="text" placeholder='Search ' /></div>
            <div className='flex flex-col gap-5 mt-5'>

            {items?.map((it,index)=>(
                <>
                {index==0&&<div className='w-full px-3'>
                     <div className='h-[1px] bg-gray-400'></div>
                    </div>}
    
                    <div className='w-full h-full flex flex-row justify-between px-3 '>
                        <div className='w-4/12 h-full '><img src="https://th.bing.com/th/id/R.09d7570ca347e320f19925b4aa057c2e?rik=jpTwTjtLLsd%2fKQ&riu=http%3a%2f%2fwww.bombaycafeboca.com%2fwp-content%2fuploads%2f2016%2f12%2f28978-chicken-biryani.jpg&ehk=pDqNcMSLbccL6T0AK0YSKoUHgdjiCuiNJ%2boG0dxsem4%3d&risl=&pid=ImgRaw&r=0" className='w-full h-full object-cover rounded-lg shadow-lg' alt="" /></div>
                        <div className='flex flex-col w-8/12 ps-5 gap-2'>
    
                          <div className='flex flex-row justify-between'>
                            <div><h1 className='font-bold text-lg' >Beef Dry Fry</h1></div>
                            <div className='w-6 h-5 bg-red-500 rounded-lg '></div>
                          </div>
    
                          <div className='flex flex-row justify-between'>
                            <div><p className='text-sm text-gray-400'>Embark on a flavor-packed journey to Kerala with our mouthwatering Beef Dry Fry recipe! Known for its vibrant spices and bold  <span className='font-bold text-gray-700'>...more</span></p></div>
                          </div>
    
                          <div className='flex flex-row justify-between items-center'>
                            <div className=''><h1 className='font-bold text-lg' >&#8377; 190 </h1></div>
                            <div className='px-6 h-6 border flex items-center justify-center border-[#F39C12] text-[#F39C12] rounded shadow '>Add</div>
                          </div>
    
                        </div>
                    </div>
    
                    <div className='w-full px-3'>
                     <div className='h-[1px] bg-gray-400'></div>
                    </div>
                </>
            ))

            }
                

            </div>
        </div>
    </div>
  )
}

export default Home