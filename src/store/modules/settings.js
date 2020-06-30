import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { title, encryption, tagsView, fixedHeader, sidebarLogo, uniqueOpened, showLoginFooter, showFooter, footerTxt, caseNumber } = defaultSettings

const state = {
  theme: variables.theme,
  encryption: encryption,
  title: title,
  showSettings: false,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  uniqueOpened: uniqueOpened,
  showLoginFooter: showLoginFooter,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

