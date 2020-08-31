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
      const assemblies = []
      for(var i = 0; i < assemblyNames.length; i++) {
        assemblies.push(assemblyManager.get(assemblyNames[i]).name)
        assemblyManager.get(assemblyNames[i]).aliases.forEach(alias => assemblies.push(alias))
      }
      return assemblies
    }
  }))
}
