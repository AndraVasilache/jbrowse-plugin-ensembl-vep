import type PluginManager from '@gmod/jbrowse-core/PluginManager'
import Plugin from '@gmod/jbrowse-core/Plugin'

import GDCFilterWidget from './GDCFilterWidget'
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
      } = pluginManager.load(GDCFilterWidget)

      return new WidgetType({
        name: 'GDCFilterWidget',
        HeadingComponent,
        configSchema,
        stateModel,
        ReactComponent,
      })
    })
  }
}
