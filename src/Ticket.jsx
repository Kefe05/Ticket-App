import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketDesign from './assets/Subtract.png';
import BarCode from './assets/Bar Code.png'
import domtoimage from 'dom-to-image';

function Ticket() {
  const navigate = useNavigate();
  const [ticketDetails, setTicketDetails] = useState(null);

  // Retrieve ticket details from localStorage
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem('ticketDetails'));
    if (details) {
      setTicketDetails(details);
    }
  }, []);

  // Handle "Book Another Ticket" button click
  const handleBookAnother = () => {
    navigate('/');
  };

  // Handle "Download Ticket" button click
  const handleDownloadTicket = () => {
    const ticketElement = document.getElementById('ticket');
  
    if (ticketElement) {
      domtoimage.toPng(ticketElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'ticket.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => console.error('Error generating image:', error));
    }
  };

  // Show loading state if ticketDetails is not yet available
  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" border-none p-3  sm:border  sm:border-solid sm:border-[#0E464F] 
      w-[95vw] sm:w-[650px] mx-auto sm:p-5 rounded-xl bg-[#041E23] 
      flex flex-col gap-5
      ">
      <div className='flex flex-col gap-2 sm:gap-3'>
      <div className="card-header flex justify-between items-center ">
        <h2 className="jeju text-xl">Ready</h2>
        <div className="roboto text-xs">Step 3/3</div>
      </div>
      <div className='bg-[#0E464F] w-full h-[2px] rounded-xl'>
        <div className="bg-[#24A0B5] w-[55%] h-full"></div>
      </div>
      </div>
      <div className="p-6 rounded-xl flex flex-col gap-3">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Your Ticket is Booked!</h2>
          <p className="text-sm">Check your email for a copy or you can download</p>
        </div>
        <div id="ticket" className="h-[550px] w-[80vw] sm:w-[80%]  mx-auto rounded-xl relative">
          <img src={TicketDesign} alt="ticket" className="object-fit h-full w-full" />

           <div className='absolute bottom-3 w-full'>
           <img src={BarCode} alt="bar code" className=' mx-auto' /> 
           </div>

          <div className="absolute top-0 h-[80%] w-full">
            <div className="w-[80%] h-[80%] m-auto mt-10 border-2 border-[#0e464f]">
              <div className="px-3 rounded-xl">
                <div className="text-center p-3">
                  <h1 className="road-rage text-gray-50 font-bold text-4xl text-center ">
                    Techember Fest ”25
                  </h1>
                  <div className="w-[85%] mx-auto text-gray-50 text-sm min-[550px]:text-base">
                    <p className="text-xs">📍 04 Rumens Road, Ikoyi, Lagos</p>
                    <p className="text-xs">📅 March 15, 2025 | 7:00 PM</p>
                  </div>
                </div>

                {/* Profile Photo */}
                {ticketDetails.attendeeDetails?.profilePhoto && (
                  <div className=" mx-auto h-[120px] w-[60%] rounded-xl overflow-hidden">
                    <img
                      src={ticketDetails.attendeeDetails.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Attendee Details */}
                <div className="bg-[#08343C] rounded-xl w-full mx-auto ">
                  <div className="grid grid-cols-2 p-2 text-gray-50 text-sm">
                    <div className='flex flex-col border-b border-slate-400 '>
                      <span className='text-slate-400'>Enter your name</span>
                      <span>{ticketDetails.attendeeDetails?.name || 'N/A'}</span>
                    </div>
                   <div className='flex flex-col border-l border-b border-slate-400 px-2'>
                    <span className='text-slate-400'>
                      Enter your email *</span>
                    <span>{ticketDetails.attendeeDetails?.email || 'N/A'}</span>
                   </div>
                   <div className='flex flex-col border-b border-slate-400'>
                    <span className='text-slate-400'>Ticket Type:</span>
                    <span>{ticketDetails.ticketType || 'N/A'}</span>
                   </div>
                    <div className='flex flex-col border-b border-l border-slate-400 px-2'>
                      <span className='text-slate-400'>Number of Tickets</span>
                      <span>{ticketDetails.numberOfTickets || 'N/A'}</span>
                    </div>

                    {ticketDetails.attendeeDetails?.specialRequest && (
                    <p className="text-xs text-gray-50 mt-2 flex flex-col">
                      <span>
                        Special Request:
                        </span>
                      <span>
                        
                      {ticketDetails.attendeeDetails.specialRequest}
                      </span> 
                    </p>
                  )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="w-[45%] border rounded-xl border-[#197686] p-2 text-sm sm:text-base"
          onClick={handleBookAnother}
        >
          Book Another Ticket
        </button>
        <button className="w-[45%] bg-[#197686] rounded-xl" onClick={handleDownloadTicket}>
          Download Ticket
        </button>
      </div>
    </div>
  );
}

export default Ticket;