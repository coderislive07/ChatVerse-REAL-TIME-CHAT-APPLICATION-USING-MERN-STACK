import React, { useRef, useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './MessageBar.css';

export default function MessageBar() {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  // Handle click outside of the EmojiPicker
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = async () => {
    // Your send message logic here
  };

  const handleAddEmoji = (emojiData) => {
    const emoji = emojiData.emoji;
    setMessage((msg) => msg + emoji);
  };

  return (
    <>
      <div
        ref={emojiRef}
        className='pt-[27.8vh] pl-9 fixed'
      >
        <EmojiPicker
          onEmojiClick={handleAddEmoji}
          open={emojiPickerOpen}
          theme='dark'
          autoFocusSearch={false}
        />
      </div>
      <div  className="h-[8vw] pt-16 bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
        <div className="flex-1 flex h-14 bg-[#2a2b33] rounded-full border border-gray-900 w-[50vh] items-center gap-5">
          <svg
            onClick={() => setEmojiPickerOpen(true)}
            className="w-6 h-6 ml-4 text-gray-400 cursor-pointer dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z"
            />
          </svg>
          <svg
            className='stroke-gray-400 cursor-pointer'
            baseProfile="tiny"
            height="34px"
            id="Layer_1"
            version="1.2"
            viewBox="0 0 24 24"
            width="34px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path d="M18.364,6.635c-1.561-1.559-4.1-1.559-5.658,0L8.172,11.17c-0.473,0.473-0.733,1.1-0.733,1.77 c0,0.668,0.261,1.295,0.732,1.768c0.487,0.486,1.128,0.73,1.769,0.73c0.64,0,1.279-0.242,1.767-0.73l2.122-2.121 c0.391-0.395,0.586-0.904,0.586-1.414c0-0.512-0.195-1.023-0.586-1.414l-3.536,3.535c-0.193,0.195-0.511,0.195-0.708-0.002 c-0.127-0.127-0.146-0.275-0.146-0.352c0-0.078,0.019-0.227,0.146-0.354l4.535-4.537c0.778-0.779,2.048-0.779,2.83,0 c0.779,0.779,0.779,2.049,0,2.828l-4.537,4.537l-2.535,2.535c-0.779,0.779-2.049,0.779-2.828,0c-0.78-0.779-0.78-2.049,0-2.828 l0.095-0.096c-0.451-0.6-0.702-1.359-0.702-2.125l-0.807,0.807c-1.56,1.559-1.56,4.098,0,5.656c0.779,0.779,1.804,1.17,2.828,1.17 s2.049-0.391,2.828-1.17l7.072-7.072C19.924,10.732,19.924,8.195,18.364,6.635z"/>
            </g>
          </svg>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-transparent rounded-md text-white placeholder-gray-500 border border-transparent focus:border-transparent focus:outline-none glow-input"
          />
          <button onClick={handleSendMessage} className="button mL-3 ">
            <div className="outline"></div>
            <div className="state state--default">
              <div className="icon pb-5">
                <svg className='mt-5 ml-2 justify-center items-center'
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="2em"
                  width="1.2em"
                >
                  <g style={{ filter: 'url(#shadow)' }}>
                    <path
                      fill="currentColor"
                      d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                    />
                    <path
                      fill="currentColor"
                      d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.54001C13.45 9.25001 13.93 9.25001 14.22 9.54001C14.51 9.83001 14.51 10.31 14.22 10.6L10.64 14.18C10.4901 14.33 10.3001 14.4 10.11 14.4ZM9.58005 12.6L12.7901 9.39001C12.9701 9.21001 13.2301 9.21001 13.4101 9.39001C13.5901 9.57001 13.5901 9.83001 13.4101 10.01L10.2001 13.22C10.0201 13.4 9.76005 13.4 9.58005 13.22C9.40005 13.04 9.40005 12.78 9.58005 12.6Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
