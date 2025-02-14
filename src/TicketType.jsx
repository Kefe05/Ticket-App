import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TicketType() {
  const navigate = useNavigate();

  // State to store ticket type and number of tickets
  const [ticketDetails, setTicketDetails] = useState({
    ticketType: '', // 'free', 'vip', or 'vvip'
    numberOfTickets: 1, // Default to 1
  });

  // Handle ticket type selection
  const handleTicketTypeSelect = (type) => {
    setTicketDetails((prev) => ({
      ...prev,
      ticketType: type,
    }));
  };

  // Handle number of tickets change
  const handleNumberOfTicketsChange = (e) => {
    const numberOfTickets = parseInt(e.target.value, 10);
    setTicketDetails((prev) => ({
      ...prev,
      numberOfTickets,
    }));
  };

  // Handle "Next" button click
  const handleNext = () => {
    // Save ticket details to localStorage
    localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
    // Navigate to the next step
    navigate('/attendee-details');
  };

  return (
    <div className=" border-none p-3  sm:border  sm:border-solid sm:border-[#0E464F] 
      w-[95vw] sm:w-[650px] mx-auto sm:p-5 rounded-xl bg-[#041E23] flex flex-col gap-5">
      <div className="card-header flex justify-between items-center">
        <h2 className="jeju text-xl">Ticket Selection</h2>
        <div className="roboto text-xs">Step 1/3</div>
      </div>
      <div className='bg-[#0E464F] w-full h-[2px] rounded-xl'>
        <div className="bg-[#24A0B5] w-[30%] h-full"></div>
      </div>
      <div className="border border-[#CCCCCC] bg-[#08252B] p-6 rounded-xl flex flex-col gap-3">
        <div className="border border-[#07373F] p-6 rounded-xl intro from-[#07373F] to-[#08252B] bg-linear-to-b">
          <h1 className="road-rage text-gray-50 font-bold text-5xl text-center">Techember Fest ”25</h1>
          <div className="text-center w-[95%] mx-auto text-gray-50 text-xs min-[550px]:text-sm flex flex-col gap-3">
            <p>
              Join us for an unforgettable experience at <br /> [Event Name]! Secure your spot now.
            </p>
            <p>📍 [Event Location] | | March 15, 2025 | 7:00 PM</p>
          </div>
        </div>
        <hr className="border-[#07373F] border-2" />
        <div className="flex flex-col gap-3">
          <span>Select Ticket Type</span>
          <div className="flex sm:flex-row flex-col justify-between text-sm gap-3">
            {/* Free Ticket */}
            <div
              className={`border-2 border-[#197686]  p-2 flex flex-col gap-2 bg-[#12464E] rounded-xl flex-1 ${
                ticketDetails.ticketType === 'free' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleTicketTypeSelect('free')}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="uppercase text-xl">Free</h3>
              <p className="uppercase">Regular Access</p>
              <small>20/52</small>
            </div>
            {/* VIP Ticket */}
            <div
              className={`border-2 border-[#197686] p-2 flex flex-col gap-2 bg-[#12464E] rounded-xl flex-1 ${
                ticketDetails.ticketType === 'vip' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleTicketTypeSelect('vip')}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="uppercase text-xl">$150</h3>
              <p className="uppercase">VIP Access</p>
              <small>20/52</small>
            </div>
            {/* VVIP Ticket */}
            <div
              className={`border-2 border-[#197686] p-2 flex flex-col gap-2 bg-[#12464E] rounded-xl w-full flex-1 ${
                ticketDetails.ticketType === 'vvip' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleTicketTypeSelect('vvip')}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="uppercase text-xl">$150</h3>
              <p className="uppercase">VVIP Access</p>
              <small>20/52</small>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label>Number of Tickets</label>
          <select
            className="border border-[#197686] p-2 rounded-xl pr-3"
            value={ticketDetails.numberOfTickets}
            onChange={handleNumberOfTicketsChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="w-[45%] border rounded-xl border-[#197686] p-2">Cancel</button>
        <button className="w-[45%] bg-[#197686] rounded-xl" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketType;