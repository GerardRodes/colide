export default {
  width () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  },
  height () {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  }
}
