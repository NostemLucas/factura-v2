<script setup lang="ts">
import { UTooltip } from '#components'
import {
  MoreHorizontal as MoreHorizontalIcon,
  ChevronLeft as ChevronLeftIcon,
  Database as DatabaseIcon,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  BarChart as BarChartIcon,
  Grid as GridIcon,
  Power as PowerIcon,
  LayoutDashboard as LayoutDashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon
} from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import MobileDrawer from './Drawer/MobileDrawer.vue'
import WebDrawer from './Drawer/WebDrawer.vue'

//breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)
const xs = breakpoints.smaller('md')

//items
const navigation = reactive([
  {
    title: 'Home',
    items: [
      { name: 'Home', icon: LayoutDashboardIcon, route: '/' },
      { name: 'Facturas', icon: FileTextIcon, route: '/facturas' },
      { name: 'Ventas', icon: ShoppingCartIcon, route: '/ventas' }
    ]
  },
  {
    title: 'Data',
    items: [
      { name: 'Usuarios', icon: DatabaseIcon, route: '/usuarios' },
      { name: 'Clientes', icon: ActivityIcon, route: '/clientes' },
      { name: 'Productos', icon: AwardIcon, route: '/productos' }
    ]
  },
  {
    title: 'Workspaces',
    items: [
      { name: 'Metricas', icon: GridIcon, route: '/metricas' },
      { name: 'Tablero', icon: UsersIcon, route: '/tablero' }
    ]
  }
])
</script>

<template>
  <!-- Sidebar -->
  <MobileDrawer v-if="xs" :navigation="navigation" />
  <WebDrawer v-else :navigation="navigation" />
</template>
