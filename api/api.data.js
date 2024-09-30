export default {
  async load() {
    return (await fetch('https://api.github.com/repos/JiaLiFuNia/SmartHNU/releases/latest')).json()
  }
}