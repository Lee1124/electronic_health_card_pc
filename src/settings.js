module.exports = {
  /**
   * @description 网站标题
   */
  title: '电子健康卡监管平台(达州)',
  /**
   * @description 是否显示 tagsView
   */
  tagsView: false,
  /**
   * @description 固定头部
   */
  fixedHeader: true,
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
   */
  passCookieExpires: 1,
  /**
   * @description 是否只保持一个子菜单的展开
   */
  uniqueOpened: true,
  /**
   * @description token key
   */
  TokenKey: 'HEALTH-CARD-TOEKN',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,
  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,
  /**
   * 是否显示登录页面设置的底部信息
   */
  showLoginFooter: true,
  /**
* 是否显示设置的底部信息
*/
  showFooter: false,
  /**
   * 底部文字，支持html语法
   */
  footerTxt: '© 2020 达州市卫生健康委员会',
  /**
   * 备案号
   */
  caseNumber: '',
  /**
   * 是否加密密码 https://blog.csdn.net/qq_37346607/article/details/85237368
   */
  encryption: true
}
