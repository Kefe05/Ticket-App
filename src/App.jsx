import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketType from './TicketType';
import AttendeeDetails from './AttendeeDetails';
import Ticket from './Ticket';
import Logo from "./assets/frame.png"
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { HiBars2 } from "react-icons/hi2";


function App() {
  return (
    <Router>
      <div className='bg-[#061C21] w-screen px-4 py-2 flex flex-col gap-5'>
        <header className='flex justify-between items-center px-3 py-3 border border-[#197686] w-[95vw] rounded-xl mx-auto'>
          <img src={Logo} alt="Our Logo" />

          <div className=' hidden text-sm md:text-[18px] text-[#B3B3B3]  jeju min-[430px]:flex gap-4 '>
            <Link to="/" className='hover:text-white ease-in'>Events</Link>
            <Link href="/attendee-details" className='hover:text-white ease-in'>My Tickets</Link>
            <Link href="/ticket" className='hover:text-white ease-in'>About Project</Link>
          </div>

         <button className="text-black hidden   bg-white rounded-xl text-sm md:text-base h-fit p-2 md:p-4 jeju min-[430px]:flex items-center gap-1">
          <span className='uppercase text-base'>My Ticket</span>
          <HiArrowLongRight />
        </button>

        <HiBars2 className='text-white text-2xl min-[430px]:hidden' /> 
        </header>
        <Routes className='p-5'>
          <Route path="/" element={<TicketType />} />
          <Route path="/attendee-details" element={<AttendeeDetails />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;