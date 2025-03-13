interface DashboardState {
  openDrawer: boolean;
}
export const useDashboard = defineStore({
  id: "dashboard",
  state: (): DashboardState => ({
    openDrawer: false,
  }),
  actions: {
    toggleDrawer() {
      this.openDrawer = !this.openDrawer;
    },
  },
});
