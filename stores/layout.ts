interface DashboardState {
  isOpenDrawer: boolean
  isCollapsed: boolean
}
export const useDashboard = defineStore('dashboard', {
  state: (): DashboardState => ({
    isOpenDrawer: false,
    isCollapsed: false
  }),
  actions: {
    toggleDrawer(state?: boolean) {
      console.log(this.isOpenDrawer)
      this.isOpenDrawer = state ? state : !this.isOpenDrawer
    },
    toggleCollapse(state?: boolean) {
      console.log(this.isOpenDrawer)
      this.isCollapsed = state ? state : !this.isCollapsed
    }
  }
})
