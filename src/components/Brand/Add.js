import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBrandAsync } from '../../redux/brandSlice';
import { Card, Modal } from 'antd';

const Add = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const data = useSelector((state) => state.brand.data);
    const refName = useRef();

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
    }

    const addHandleClick = (event) => {
        event.preventDefault();
        if (name != '') {

            // Aynı isimde kayıt var mı kontrol ediliyor.
            const findTitle = data.filter((brand) => {
                return brand.title == name
            });

            if (findTitle.length > 0) {
                Modal.error({
                    title   : 'Hata',
                    content : 'Bu marka daha önceden eklenmiş',
                    okText  : 'Tamam'
                  });
                refName.current.focus();
                return;

            }

            

            dispatch(addBrandAsync({
                title: name
            }))

            setName('')

        }
    }

    return (
        <>
            <div className='flex items-center justify-center my-4 px-4'>
                <div className='w-full shadow-lg'>
                    <Card title="Yeni Ekle">
                        <input className="border w-[90%] h-8 p-2 outline-0" type="text" placeholder="İsim" value={name} onChange={handleChange} ref={refName} />
                        <button className='bg-sky-600 hover:bg-sky-700 text-white py-1 px-4 ml-2 rounded-full cursor-pointer' type='submit' onClick={addHandleClick} disabled={name == '' ? true : false} >Ekle</button>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Add