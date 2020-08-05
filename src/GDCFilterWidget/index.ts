import PluginManager from '@gmod/jbrowse-core/PluginManager'
import stateModel from './model'
import EnsemblVEPComponent from './components/EnsemblVEPComponent'

export default (jbrowse: PluginManager) => {
  const React = jbrowse.lib.react

  const ReactComponent = jbrowse.load(EnsemblVEPComponent)
  const { ConfigurationSchema } = jbrowse.lib[
    '@gmod/jbrowse-core/configuration'
  ]

  const { observer } = jbrowse.lib['mobx-react']

  return {
    configSchema: ConfigurationSchema('EnsemblVEPWidget', {}),
    ReactComponent,
    stateModel: jbrowse.load(stateModel),
    heading: "Ensembl VEP"
  }
}
