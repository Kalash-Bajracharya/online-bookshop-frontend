import { useEffect, useState } from 'react'
import { GetRequest } from "../../../services/http";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
    const [books,setBooks]=useState([])

    const fetchBooks = async () => {
        try {
          const res = await GetRequest("books/getall");
          setBooks(res.data);
        } catch (err) {
          alert("Error while fetching");
        }
      };

     const fetchUsers = async () => {
        try {
          const res = await GetRequest("users/getall");
          setUsers(res.data);
        } catch (err) {
          alert("Error while fetching");
          console.log(err)

        
        }
      };

        useEffect(() => {
          fetchUsers();
          fetchBooks()          
        }, []);
  return (
    <div className="p-8 w-5/6 bg-gray-100">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-2">
           Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome back, Admin
        </p>


        {/* Statistics */}
        <div className="grid grid-cols-2 gap-6">

          {/* Users */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Total Users
            </p>

            <h2 className="text-3xl font-bold mt-5">
              {users.length}
            </h2>

            <p className="text-gray-500">
              Registered accounts
            </p>


          </div>


          {/* Blogs */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Total Books
            </p>

            <h2 className="text-3xl font-bold mt-5">
              {books.length}
            </h2>

            <p className="text-gray-500">
              in inventory
            </p>
          </div>


          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              Categories
            </p>

            <h2 className="text-3xl font-bold mt-5">
              {new Set(books.map((book) => book.category)).size}
            </h2>

            <p className="text-gray-500">
              Genres
            </p>
          </div>

        </div>


        

      </div>
  )
}

export default Dashboard
