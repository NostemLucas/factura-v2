<script setup lang="ts">
import TopBar from '~/components/layout/TopBar.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import {
  Database as DatabaseIcon,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  Grid as GridIcon,
  LayoutDashboard as LayoutDashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon
} from 'lucide-vue-next'
import MobileDrawer from '~/components/layout/MobileDrawer.vue'
import WebDrawer from '~/components/layout/WebDrawer.vue'
const store = useDashboard()

//breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)

export interface SideBar {
  title: string
  items: {
    name: string
    icon: any
    route: string | null
    badge?: {
      count: number
      variant: 'primary' | 'success' | 'warning' | 'danger'
    }
  }[]
}

const xs = breakpoints.smaller('md')

const navigation: SideBar[] = reactive([
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
  <div class="flex flex-col overflow-hidden dark:bg-background">
    <MobileDrawer v-if="xs" :navigation="navigation" />
    <WebDrawer v-else :navigation="navigation" />
    <TopBar :navigation="navigation" />
    <div
      :class="[
        xs ? 'ml-0' : store.isCollapsed ? 'ml-[84px]' : 'ml-72',
        'min-h-[calc(100vh-64px)]',
        'transition-all duration-300 ease-in-out'
      ]"
    >
      <slot />
    </div>
  </div>
</template>
