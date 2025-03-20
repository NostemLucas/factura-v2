interface DashboardState {
  isOpenDrawer: boolean
  isLoading: boolean
  isCollapsed: boolean
}
export const useDashboard = defineStore('dashboard', {
  state: (): DashboardState => ({
    isOpenDrawer: false,
    isLoading: false,
    isCollapsed: true
  }),
  actions: {
    toggleDrawer() {
      console.log('open-drawer', this.isOpenDrawer)
      this.isOpenDrawer = !this.isOpenDrawer
    },
    showLoading() {
      console.log(this.isOpenDrawer)
      this.isLoading = true
    },
    hiddenLoading() {
      console.log(this.isOpenDrawer)
      this.isLoading = false
    },
    toggleCollapse() {
      console.log('open-drawer', this.isCollapsed)
      this.isCollapsed = !this.isCollapsed
    }
  }
})
