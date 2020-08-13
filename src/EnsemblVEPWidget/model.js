import { ElementId } from '@gmod/jbrowse-core/util/types/mst'

export default jbrowse => {
  const { types } = jbrowse.jbrequire('mobx-state-tree')

  return types
  .model('EnsemblVEPWidget', {
    id: ElementId,
    type: types.literal('EnsemblVEPWidget'),
    featureData: types.frozen({}),
  })
  .actions(self => ({
    setFeatureData(data) {
      self.featureData = data
    },
    clearFeatureData() {
      self.featureData = {}
    },
  }))
}
