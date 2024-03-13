const lcjs = require('@arction/lcjs')
const { lightningChart, PointShape, Themes } = lcjs

const chart = lightningChart()
    .Chart3D({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Bubble Chart with 4 KPIs and data grouping')

// Generate random data set for example purposes
// color by group where data point belongs
// x = kpi
// y = kpi
// z = kpi
// size = kpi
const groupsData = new Array(3).fill(0).map((_) => {
    const dataCount = 1_000
    const data = new Array(dataCount)
    for (let i = 0; i < dataCount; i += 1) {
        const x = Math.random()
        const y = Math.random() ** 10
        const z = Math.random()
        const kpi4 = Math.random()
        // Map 4th performance indicator value to a point size as pixels.
        const size = 1 + 19 * kpi4 ** 3
        data[i] = { x, y, z, size }
    }
    return data
})

// Bubble chart can be visualized with a PointSeries.
// This supports several display methods, including the one used here where each data point has an individual size.
// In this example, separate groups of data are split into their own series. This way they can be toggled on/off from the legend.

const groupsSeries = groupsData.map((data, i) => {
    const pointSeries = chart
        .addPointSeries({
            individualPointSizeEnabled: true,
        })
        .setName(`Group ${i + 1}`)
        .add(data)
    return pointSeries
})

chart.getDefaultAxisX().setTitle('KPI X').fit(false)
chart.getDefaultAxisY().setTitle('KPI Y').fit(false)
chart.getDefaultAxisZ().setTitle('KPI Z').fit(false)

const legend = chart.addLegendBox().add(chart)
