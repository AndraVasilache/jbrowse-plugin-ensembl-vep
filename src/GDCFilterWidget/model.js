import { ElementId } from '@gmod/jbrowse-core/util/types/mst'

export default jbrowse => {
  const { types } = jbrowse.jbrequire('mobx-state-tree')

  return types
  .model('EnsemblVEPDrawerWidget', {
    id: ElementId,
    type: types.literal('EnsemblVEPDrawerWidget'),
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
