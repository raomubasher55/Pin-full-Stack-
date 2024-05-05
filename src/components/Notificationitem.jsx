import React from 'react'

export const Notificationitem = () => {
    return (
        <>
            <div>
                <div className="notification bg-white rounded-lg shadow-lg p-2">
                    {/* <div className="notification-header flex justify-between items-center">
            <h3 className="notification-title text-lg font-bold">New notification</h3>
            <i className="fa fa-times notification-close text-gray-500 cursor-pointer"></i>
        </div> */}
                    <div className="notification-container flex flex-row lg:flex-row items-center mt-4">
                        <div className="notification-media mr-4 lg:mr-8  ">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" className="lg:w-14 lg:h-10 md:w-9 md:h-9 h-6 w-8 rounded-full" />
                            <i className="fa fa-thumbs-up notification-reaction text-blue-500 ml-2"></i>
                        </div>
                        <div className="notification-content">
                            <p className="notification-text lg:text-base md:text-[10px] text-[7px]">
                                <strong className="text-blue-500">evondev</strong>, <strong className="text-blue-500">Trần Anh Tuấn</strong> and 154 others react to your post in <strong className="text-blue-500">Cộng đồng Frontend Việt Nam</strong>
                            </p>
                            <span className="notification-timer text-gray-500 lg:text-base md:text-[10px] text-[5px]">a few seconds ago</span>
                        </div>
                        <span className="notification-status"></span>
                    </div>
                </div>
            </div>

        </>
    )
}
