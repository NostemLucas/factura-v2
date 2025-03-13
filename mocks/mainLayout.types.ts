import type { Slot } from 'vue'
import {
  Menu as MenuIcon,
  File as FileIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Share as ShareIcon,
  MessageCircle as MessageCircleIcon,
  Lightbulb as LightbulbIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  HelpCircle as HelpCircleIcon,
  Circle as CircleIcon,
  User as UserIcon,
  Home as HomeIcon,
  PieChart as PieChartIcon,
  BarChart2 as BarChartIcon,
  FileText as FileTextIcon,
  Users as UsersIcon,
  ChevronDown as ChevronDownIcon,
  Grid as GridIcon,
  MoreHorizontal as MoreHorizontalIcon,
  List as ListIcon,
  LayoutGrid as LayoutGridIcon,
  Columns as ColumnsIcon,
  Plus as PlusIcon,
  Minus as MinusIcon
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
