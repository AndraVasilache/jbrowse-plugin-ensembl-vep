import type PluginManager from '@gmod/jbrowse-core/PluginManager'
import Plugin from '@gmod/jbrowse-core/Plugin'

import EnsemblVEPWidget from './EnsemblVEPWidget'
export default class extends Plugin {
  name = 'GDCPlugin'

  install(pluginManager: PluginManager) {
    const AdapterType =
      pluginManager.lib['@gmod/jbrowse-core/pluggableElementTypes/AdapterType']
    const WidgetType =
      pluginManager.lib[
        '@gmod/jbrowse-core/pluggableElementTypes/WidgetType'
      ]

    pluginManager.addWidgetType(() => {
      const {
        configSchema,
        HeadingComponent,
        ReactComponent,
        stateModel,
      } = pluginManager.load(EnsemblVEPWidget)

      return new WidgetType({
        name: 'EnsemblVEPWidget',
        HeadingComponent,
        configSchema,
        stateModel,
        ReactComponent,
      })
    })
  }
}
