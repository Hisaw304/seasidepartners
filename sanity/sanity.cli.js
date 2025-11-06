import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gol89usa',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
