import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BooksCard from '../Components/Home/BooksCard';
import BooksTable from '../Components/Home/BooksTable';
import LoginSignupButton from '../Components/LoginSignupButton';
import Spinner from '../Components/Spinner';
import '../index.css';

function Home(props) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table')
    useEffect(() => {
        setLoading(true);
        axios
            .get('https://book-store-mern-server-two.vercel.app/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const isUser = localStorage.getItem("authToken")
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center gap-x-4' >
                <div className='flex justify-center items-center gap-x-4'>
                    <button
                        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('table')}
                    >
                        Table
                    </button>
                    <button
                        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                        onClick={() => setShowType('card')}
                    >
                        Card
                    </button> 
                </div>
                <LoginSignupButton/>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                {
                    isUser && <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
                }
            </div>
            {loading ?  <Spinner />  : showType === 'table' ? <BooksTable books={books} /> : <BooksCard books={books}/>}
        </div>
    );
}

export default Home;