import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineFolderOpen,
  HiOutlineInboxIn,
  HiOutlineUser,
  HiOutlineViewList,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { FaFileContract } from 'react-icons/fa'

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    icon: <HiOutlineHome />,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dash',
    icon: <HiOutlineViewGrid />,
  },
  {
    key: 'store',
    label: 'Add Store',
    path: '/store',
    icon: <HiOutlineShoppingBag />,
  },
  {
    key: 'MyCatalogue',
    label: 'My Catalogue',
    path: '/myCatalogue',
    icon: <HiOutlineFolderOpen />,
  },
  {
    key: 'addProducts',
    label: 'Add Products',
    path: '/addProducts',
    icon: <HiOutlineInboxIn />,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    path: '/inventory',
    icon: <HiOutlineViewList />,
  },
  {
    key: 'contractList',
    label: 'Contracts',
    path: '/contractsList',
    icon: <FaFileContract />,
  },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'profile',
    label: 'My Profile',
    path: '/profile',
    icon: <HiOutlineUser />,
  },
  {
    key: 'support',
    label: 'Help & Support',
    path: '/support',
    icon: <HiOutlineQuestionMarkCircle />,
  },
]
