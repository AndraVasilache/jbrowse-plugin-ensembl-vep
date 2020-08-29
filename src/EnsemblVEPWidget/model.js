import { ElementId } from '@gmod/jbrowse-core/util/types/mst'
import { getSession } from '@gmod/jbrowse-core/util'

export default jbrowse => {
  const { types } = jbrowse.jbrequire('mobx-state-tree')

  return types
  .model('EnsemblVEPWidget', {
    id: ElementId,
    type: types.literal('EnsemblVEPWidget'),
    featureData: types.frozen({}),
    assemblyNames: types.array(types.string),
    speciesName: types.maybe(types.string)
  })
  .actions(self => ({
    setFeatureData(data) {
      self.featureData = data
    },
    clearFeatureData() {
      self.featureData = {}
    },
    setSpeciesName(newSpeciesName) {
      self.speciesName = newSpeciesName
    }
  }))

  .views(self => ({
    get allAssemblyNames() {
      const {assemblyManager, assemblyNames} = getSession(self)
      //foreach
      const assembly = assemblyManager.get(assemblyNames[0])
      return [assembly.name, ...assembly.aliases]
    }
  }))
}
