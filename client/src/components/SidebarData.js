import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
{
	title: "Gym Enrollemnt",
	path: "/gym-enrollment",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Thread Mill",
		path: "/gym-enrollment/Threadmill",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Weight Lifting",
		path: "/gym-enrollment/WeightLifting",
		icon: <IoIcons.IoIosPaper />,
	},
    {
		title: "Stair Case",
		path: "/gym-enrollment/StairCase",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},

{
	title: "Activities Chart",
	path: "/activitieschart",
	icon: <IoIcons.IoIosPaper />,
},
{
	title: "Log Hours",
	path: "/log hours",
	icon: <FaIcons.FaEnvelopeOpenText />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Thread Mill",
		path: "/log hours/loghours1",
		icon: <IoIcons.IoIosPaper />,
	},
	{
		title: "Weight Lifting",
		path: "/log hours/loghour2",
		icon: <IoIcons.IoIosPaper />,
	},
    {
		title: "Stair Case",
		path: "/log hours/loghour3",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Class Schedule",
	path: "/classSchedule",
	icon: <IoIcons.IoMdHelpCircle />,
},
];
