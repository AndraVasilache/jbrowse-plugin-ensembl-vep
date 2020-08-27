import {
  BaseCard,
  Attributes,
} from '@gmod/jbrowse-core/BaseFeatureWidget/BaseFeatureDetail'

export default jbrowse => {
  const { makeStyles, Paper, Tooltip } = jbrowse.jbrequire(
    '@material-ui/core',
  )
  
  const { observer, PropTypes: MobxPropTypes } = jbrowse.jbrequire('mobx-react')
  const React = jbrowse.lib.react
  const { useState, useEffect } = React

  const useStyles = makeStyles(theme => ({
    transcriptId: {
      fontSize: '1.1em',
      borderBottom: '1px solid #0003',
      backgroundColor: '#a6c1cf',
      marginRight: theme.spacing(1),
      padding: theme.spacing(0.5),
      textAlign: 'center',
    },
  }))

  //TODO: React Testing Library
  const BaseTranscripts = props => {
    const { feature } = props
    delete feature.intergenic_consequence
    delete feature.transcript_id
  
    const descriptions = {
      consequence_terms: 'Annotation (a.k.a. effect or consequence): Annotated using Sequence Ontology terms.',
      biotype: 'Transcript biotype',
      impact: 'Putative impact possible values: MODIFIER, LOW, MODERATE, HIGH',
    }
    return (
      <Attributes {...props} attributes={feature} descriptions={descriptions} />
    )
  }

  function VariantFeatureDetails(props) {
    const consequences = []
    const [data, setData] = useState()
    const classes = useStyles()
    const { model } = props
    const feat = JSON.parse(JSON.stringify(model.featureData))
    const { samples, ...rest } = feat
    const { ALT, CHROM, start, end } = feat
    const query = `${CHROM}:${start}:${end}/${ALT[0]}`
    const species = 'human'
  
    useEffect(() => {
      const controller = new AbortController()
      const { signal } = controller
      async function ensembl() {
        try {
          const response = await fetch(
            `https://rest.ensembl.org/vep/${species}/region/${query}?content-type=application/json`,
            { signal },
          )
          const content = await response.json()
          setData(content)
        } catch (error) {
          if (!signal.aborted) console.error(error)
        }
      }
  
      ensembl()
      return () => {
        controller.abort()
      }
    }, [query])
  
    if (data !== undefined) {
      let array = data[0].transcript_consequences
      if (array !== undefined) {
        array.forEach(elem => {
          const x = {}
          x.transcript_id = elem.transcript_id
          x.consequence_terms = elem.consequence_terms.join(', ')
          x.biotype = elem.biotype
          x.impact = elem.impact
          consequences.push(x)
        })
      } else {
        array = data[0].intergenic_consequences
        if (array !== undefined) {
          array.forEach((elem, index) => {
            const x = {}
            x.intergenic_consequence = `auto generated index ${index + 1}`
            x.consequence_terms = elem.consequence_terms.join(', ')
            x.impact = elem.impact
            consequences.push(x)
          })
        }
      }
    }
  
    return (
      <Paper className={classes.root} data-testid="variant-side-drawer">
        <BaseCard {...props} title="Consequences">
          {consequences &&
            consequences.map(elem => (
              <div key={elem.transcript_id || elem.intergenic_consequence}>
                <Tooltip
                  title={
                    elem.transcript_id
                      ? 'transcript id'
                      : 'intergenic consequence id'
                  }
                  arrow
                >
                  <div className={classes.transcriptId}>
                    {elem.transcript_id || elem.intergenic_consequence}
                  </div>
                </Tooltip>
                <BaseTranscripts feature={elem} {...props} />
              </div>
            ))}
        </BaseCard>
      </Paper>
    )
  }
  
  VariantFeatureDetails.propTypes = {
    model: MobxPropTypes.observableObject.isRequired,
  }

  return observer(VariantFeatureDetails)
}
