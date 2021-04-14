import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings />,
        className: 'nav-text'
    },
    {
        title: 'Add Expense',
        path: '/addExpense',
        icon: <FaIcons.FaPlus />,
        className: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <IoIcons.IoIosLogOut />,
        className: 'nav-text'
    }
]