export const garages = [
    {
        id: 'lwc',
        name: 'Los Wenders Custom',
        location: {
            x: -212.013, y: -1323.883, z: 30, area: 20
        },
        markers: [
            { x: -220.013, y: -1323.883, z: 29.5, area: 5 },
            { x: -212.013, y: -1323.883, z: 29.5, area: 5 },
            { x: -205.013, y: -1323.883, z: 29.5, area: 5 }
        ]
    }
]

export const menuOptions = [

    {
        modId: 0,
        name: 'SPOILER',
        title: 'Aerofólios',
        info: 'Melhora a estabilidade',
        stock: true,
        children: []
    },
    {
        modId: 7,
        name: 'HOOD',
        title: 'Capô',
        info: 'Deixa bonitão',
        stock: true,
        children: []
    },
    {
        modId: null,
        name: 'CHASSIS',
        title: 'Chassis',
        info: 'Não dá dano',
        stock: true,
        hasMods: false,
        children: [
            {
                modId: 42,
                name: 'ARCH COVER',
                title: 'Chassis 1',
                info: 'ARCH COVER',
                stock: true
            },
            {
                modId: 43,
                name: 'AERIALS',
                title: 'Chassis 2',
                info: 'ARCH COVER',
                stock: true
            },
            {
                modId: 44,
                name: 'ROOF SCOOPS',
                title: 'Chassis 3',
                info: 'ARCH COVER',
                stock: true
            },
            {
                modId: 45,
                name: 'TANK',
                title: 'Chassis 4',
                info: 'ARCH COVER',
                stock: true
            },
            {
                modId: 46,
                name: 'DOORS',
                title: 'Chassis 5',
                info: 'ARCH COVER',
                stock: true
            },
            {
                modId: 5,
                name: 'ROLL CAGE',
                title: 'Roll cage',
                info: 'Stiffen your chassis with a rollcage',
                stock: true
            }
        ]
    }
]