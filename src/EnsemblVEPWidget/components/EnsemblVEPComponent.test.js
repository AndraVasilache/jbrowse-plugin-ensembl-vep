import React from 'react'
import { render } from '@testing-library/react'
import { observable } from 'mobx'

import EnsemblVEPComponent from './EnsemblVEPComponent'
import { timeStamp } from 'console'

describe("EnsemblVEPComponent widget", () => {

it("renders the first element correctly ", () => {
    const f = observable({
        featureData: {
            refName: 'ctgA',
            start: 176,
            end: 177,
            name: 'rs123',
            REF: 'A',
            ALT: '<TRA>',
            QUAL: 10.4,
            INFO: {
            MQ: 5,
            },
        },
    })

    const { container } = render(<VariantFeatureDetails model={f} />)
    expect(container.firstChild).toMatchSnapshot()
})

})