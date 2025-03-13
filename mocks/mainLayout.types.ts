import type { Slot } from 'vue'
import {
  Share as ShareIcon,
  HelpCircle as HelpCircleIcon,
  Home as HomeIcon,
  PieChart as PieChartIcon,
  BarChart2 as BarChartIcon,
  FileText as FileTextIcon,
  Users as UsersIcon,
  MoreHorizontal as MoreHorizontalIcon
} from 'lucide-vue-next'

export const SidebarItems: Array<Item> = [
  { id: 1, title: 'Home', url: '/dashboard', icon: HomeIcon },
  { id: 2, title: 'Gráficas', url: '/dashboard', icon: PieChartIcon },
  { id: 3, title: 'Facturas', url: '/dashboard', icon: FileTextIcon },
  { id: 4, title: 'Ventas', url: '/dashboard', icon: FileTextIcon },
  { id: 5, title: 'Usuarios', url: '/dashboard', icon: UsersIcon },
  { id: 6, title: 'Ayuda', url: '/dashboard', icon: HelpCircleIcon },
  { id: 7, title: 'Shared Links', url: '/dashboard', icon: ShareIcon },
  { id: 8, title: 'ESG', url: '/dashboard', icon: BarChartIcon },
  { id: 9, title: 'Mas', url: '/dashboard', icon: MoreHorizontalIcon }
]

interface Item {
  id: number
  title: string
  url: string
  icon: Slot
}
