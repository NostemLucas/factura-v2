interface DashboardState {
  isOpenDrawer: boolean
  isLoading: boolean
  isCollapsed: boolean
  originalCollapsedState: boolean
}
export const useDashboard = defineStore('dashboard', {
  state: (): DashboardState => ({
    isOpenDrawer: false,
    isLoading: false,
    isCollapsed: true,
    originalCollapsedState: false
  }),
  actions: {
    toggleDrawer() {
      console.log('open-drawer', this.isOpenDrawer)
      this.isOpenDrawer = !this.isOpenDrawer
      if (this.isOpenDrawer) {
        this.originalCollapsedState = this.isCollapsed
        this.isCollapsed = false
      } else {
        this.isCollapsed = this.originalCollapsedState
      }
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
