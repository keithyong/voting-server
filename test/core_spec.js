import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core'

describe('application logic', () => {

    // describe setEntries function from the immutable library
    describe('setEntries', () => {

        // setEntries should add the entries to the state Map() data structure
        it('adds the entries to the state', () => {
            // Make a new state which is a Map immutable
            const state = Map()

            // Make a new entries List
            const entries = ['Trainspotting', '28 Days Later']
            const nextState = setEntries(state, entries)

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }))
        })
    })

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            })

            const nextState = next(state)
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }))
        })
    })

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List()
            })

            const nextState = vote(state, 'Trainspotting')

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                talley: Map({
                    'Trainspotting': 1
                }),
                entries: List()
            }))
        })

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            })

            const newState = vote(state, 'Trainspotting')

            expect(newState).to.equal(
                Map({
                    vote: Map({
                        pair: List.of('Trainspotting', '28 Days Later'),
                        tally: Map({
                            'Trainspotting': 4,
                            '28 Days Later': 2
                        })
                    }),
                    entries: List()
                })
            )
        })
    })
})
