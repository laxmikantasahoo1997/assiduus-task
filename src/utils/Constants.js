import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  export const sideBarItems = [
    {
        icon:<GridViewOutlinedIcon/> ,
        title:"Dashboard"
    },
    {
        icon:<AccountBalanceWalletOutlinedIcon/>,
        title:"Accounts"
    },
    {
        icon:<AttachMoneyOutlinedIcon/>,
        title:"Payroll"
    },
    {
        icon:<TextSnippetOutlinedIcon/>,
        title:"Reports"
    },
    {
        icon:<PersonOutlinedIcon/>,
        title:"Advisor"
    },
    {
        icon:<ContactsOutlinedIcon/>,
        title:"Contacts"
    },
  ];

 export const initialInvoiceData = [
    { label: "Older", value: 10 },
    { label: "Jan 01", value: 15 },
    { label: "Jan 09", value: 23 },
    { label: "Jan 17", value: 20 },
    { label: "jan 25", value: 22 },
    { label: "Future", value: 13 },
  ];
export const initialTotalData = [
  { label: "Aug", inValue: 10, outValue: 5 },
  { label: "Sept", inValue: 15, outValue: 8 },
  { label: "Oct", inValue: 20, outValue: 21 },
  { label: "Nov", inValue: 25, outValue: 18 },
  { label: "Dec", inValue: 14, outValue: 9 },
  { label: "Jan", inValue: 8, outValue: 6 },
];
export const createData=(name)=> {
    return {
      name: name,
      calories: Math.floor(Math.random() * 1000), // Generates a random integer for calories
      fat: parseFloat((Math.random() * 20).toFixed(1)), // Generates a random float for fat
    };
  }
  
  