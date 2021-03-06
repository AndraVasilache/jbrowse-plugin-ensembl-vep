import type PluginManager from '@gmod/jbrowse-core/PluginManager'
import Plugin from '@gmod/jbrowse-core/Plugin'
import StorageIcon from '@material-ui/icons/Storage'
import { getSession, isSessionModelWithWidgets } from '@gmod/jbrowse-core/util'
import { getConf } from '@gmod/jbrowse-core/configuration'

import EnsemblVEPWidget from './EnsemblVEPWidget'
import { autorun } from 'mobx'
export default class extends Plugin {
  name = 'EnsemblPlugin'

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
        heading: 'Feature Details',
        name: 'EnsemblVEPWidget',
        HeadingComponent,
        configSchema,
        stateModel,
        ReactComponent,
      })
    })
  }

  configure(pluginManager: PluginManager) {
    const session = pluginManager.rootModel?.session
    const alreadyAdded: string[] = []
    autorun(() => {
      const { views } = session || { views: [] }
      views.forEach(view => {
        if (view.type === 'LinearGenomeView') {
          const { tracks } = view
          tracks.forEach(track => {
            if (
              track.type === 'VariantTrack' &&
              !alreadyAdded.includes(track.id)
            ) {
              alreadyAdded.push(track.id)
              track.addAdditionalContextMenuItemCallback(
                (feature, track, pluginManager) => {
                  if (!feature) {
                    return []
                  }
                  const menuItem = {
                    label: 'Ensembl VEP',
                    icon: StorageIcon,
                    onClick: () => {
                      if (isSessionModelWithWidgets(session)) {
                        const featureWidget = session.addWidget(
                          'EnsemblVEPWidget',
                          'ensemblVEPWidget',
                          { featureData: feature.toJSON(), 
                            assemblyNames: getConf(track, 'assemblyNames') },
                        )
                        session.showWidget(featureWidget)
                      }
                  }
                }
                  return [menuItem]
                },
              )
            }
          })
        }
      })
    })
  }
}
