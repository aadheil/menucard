import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

function Home() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Chicken Biryani',
            description: 'Aromatic rice cooked with tender chicken pieces and flavorful spices for an unforgettable taste of India.',
            price: 190,
            image: 'https://th.bing.com/th/id/R.09d7570ca347e320f19925b4aa057c2e?rik=jpTwTjtLLsd%2fKQ&riu=http%3a%2f%2fwww.bombaycafeboca.com%2fwp-content%2fuploads%2f2016%2f12%2f28978-chicken-biryani.jpg&ehk=pDqNcMSLbccL6T0AK0YSKoUHgdjiCuiNJ%2boG0dxsem4%3d&risl=&pid=ImgRaw&r=0',
            cartCount: 0
        },
        {
            id: 2,
            name: 'Mutton Biryani',
            description: 'Rich and flavorful biryani made with marinated mutton and seasoned with aromatic spices.',
            price: 250,
            image: 'https://www.licious.in/blog/wp-content/uploads/2022/06/mutton-hyderabadi-biryani-01-750x750.jpg',
            cartCount: 0
        },
        {
            id: 3,
            name: 'Paneer Tikka',
            description: 'Grilled paneer cubes marinated in spicy yogurt, perfect as a vegetarian appetizer.',
            price: 150,
            image: 'https://2.bp.blogspot.com/-neI6rKuvsKI/VyN8GMrfhzI/AAAAAAAAHls/hugFFTKYgs8lrtUSXx0iEyG-KZwL4bPbwCLcB/s1600/tandoori-paneer-tikka4.jpg',
            cartCount: 0
        },
        {
            id: 4,
            name: 'Masala Dosa',
            description: 'Crispy and golden dosa filled with spiced potato filling, served with chutney and sambar.',
            price: 100,
            image: 'https://th.bing.com/th/id/OIP.XSCo5S6kP3o-7-jVqH4vGgHaE8?rs=1&pid=ImgDetMain',
            cartCount: 0,
        },
        {
            id: 5,
            name: 'Pav Bhaji',
            description: 'A delicious blend of mashed vegetables and spices served with buttered bread rolls.',
            price: 80,
            image: 'https://th.bing.com/th/id/OIP.QIdkAbtgTIW7vvuG8h-ewwHaLF?w=900&h=1348&rs=1&pid=ImgDetMain',
            cartCount: 0
        },
        {
            id: 6,
            name: 'Butter Chicken',
            description: 'Tender chicken pieces in a creamy tomato sauce, a classic North Indian dish.',
            price: 220,
            image: 'https://www.whiskaffair.com/wp-content/uploads/2014/08/Butter-Chicken-2-1-1200x1800.jpg',
            cartCount: 0
        }
    ]);

    const updateToCart = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, cartCount: 1 } : item
        ));
    };

    const plusItems = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, cartCount: item.cartCount + 1 } : item
        ));
    };
    
    const minusItems = (id) => {
        setItems(items.map(item => 
            item.id === id && item.cartCount > 1 ? { ...item, cartCount: item.cartCount - 1 } : item
        ));
    };
    
    return (
        <div className='flex justify-center bg-gray-100 h-lvh w-full' style={{ fontFamily: 'ropa sans' }}>
            <div className='flex flex-col w-full h-full'>
                <div className='flex w-full justify-center px-3 mt-5'>
                    <input className='w-full rounded-lg p-2 border-[#F39C12] border shadow bg-transparent' type="text" placeholder='Search ' />
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                    {items?.map((item) => (
                        <React.Fragment key={item.id}>
                            <div className='w-full h-full flex flex-row justify-between px-3'>
                                <div className='w-4/12 h-28'>
                                    <img src={item.image} className='w-full h-full object-cover rounded-lg shadow-lg' alt={item.name} />
                                </div>
                                <div className='flex flex-col w-8/12 ps-5 h-28  gap-2'>
                                    <div className='flex flex-row justify-between'>
                                        <h1 className='font-bold text-lg'>{item.name}</h1>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <p className='text-sm text-gray-400'>
                                            {item.description.slice(0, 60)}<span className='font-bold text-gray-700'>...more</span>
                                        </p>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h1 className='font-bold text-lg'>&#8377; {item.price}</h1>
                                        {item?.cartCount === 0 ? (
                                            <button onClick={() => updateToCart(item?.id)} className='px-10 h-7 border flex items-center justify-center border-[#F39C12] text-[#F39C12] rounded shadow'>
                                                Add
                                            </button>
                                        ) : (
                                            <div className='flex flex-row gap-4 h-7 items-center border border-[#F39C12] rounded shadow'>
                                                <button onClick={() => minusItems(item?.id)} className='px-2 py-1  rounded text-[#F39C12] '>
                                                    <Icon icon="ic:baseline-minus" />
                                                </button>
                                                <span className='font-bold text-[#F39C12] text-lg'>{item?.cartCount}</span>
                                                <button onClick={() => plusItems(item?.id)} className='px-2 py-1 rounded text-[#F39C12] '>
                                                    <Icon icon="ic:baseline-plus"  />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full px-3'>
                                <div className='h-[1px] bg-gray-400'></div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
