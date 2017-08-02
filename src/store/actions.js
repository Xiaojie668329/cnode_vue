export default {
  displaySidebar: ({commit}) => commit('DISPLAY_SIDEBAR'),
  isCurrent: ({commit}, tab) => commit('IS_CURRENT', tab),
  isLoading: ({commit}, value) => commit('IS_LOADING', value),
  isContent: ({commit}, value) => commit('IS_CONTENT', value)
}
