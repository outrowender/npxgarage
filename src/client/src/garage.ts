import { garages } from "../../config"
import { f } from "../../utils";

export class Garage {
    id: string
    name: string
    location: Location
    distance?: number
    markers: Location[]

    constructor(id, name, location, markers, entity) {
        id = id
        name = name
        location = location
        markers = markers

        this.updateDistances(location, markers, entity)
    }

    updateDistances(entity, location, markers) {
        const [eX, eY, eZ] = GetEntityCoords(entity)

        this.distance = GetDistanceBetweenCoords(location.x, location.y, location.z, eX, eY, eZ, false)

        this.markers.map(marker => {
            return {
                distance: GetDistanceBetweenCoords(marker.x, marker.y, marker.z, eX, eY, eZ, false),
            }
        })
    }

    drawMarkers() {
        this.markers.forEach(mark =>
            drawGarageMarker(mark.x, mark.y, mark.z)
        )
    }
}

/**
*  check is player next to a garage with a car
* @returns boolean if is with a car in a garage
*/
export function isPedInGarageWithaCar(): boolean {
    const ped = PlayerPedId()
    const veh = GetVehiclePedIsUsing(ped)
    const entityModel = GetEntityModel(veh)

    if (!IsPedAPlayer(ped) && !IsPedSittingInAnyVehicle(ped)) return false
    if (!IsThisModelACar(entityModel)) return false

    return isInGarageArea(ped)
}


/**
*  check is player near a garage
* @param entity the entity identification
* @returns boolean if entity is in garage area
*/
export function isInGarageArea(entity: number): boolean {
    return getGaragesWithDistanceAndArea(entity).some(garage => garage.distance <= f(garage.area))
}

/**
*  get all garages with distance from a entity
* @param entity the entity identification
* @returns garages with id, distance and area
*/
export function getGaragesWithDistanceAndArea(entity: number) {
    const [eX, eY, eZ] = GetEntityCoords(entity)

    return garages.map(garage => {
        return {
            id: garage.id,
            distance: GetDistanceBetweenCoords(garage.location.x, garage.location.y, garage.location.z, eX, eY, eZ, false),
            area: garage.location.area
        }
    })
}

/**
*  get nearest garage in area
* @param entity the entity identification
* @returns garages with id, distance and area
*/
export function getGarageInArea(entity: number) {
    return getGaragesWithDistanceAndArea(entity).find(garage => garage.distance <= f(garage.area)).id || null
}

/**
*  get a garage details
* @param id garage identification
* @returns garage's detail, markers and name
*/
export function getGarage(id: string) {
    return garages.find(x => x.id == id) || null
}

/**
*  check entity is in garage marker
* @param id garage identification
* @returns garages detail, markers and name
*/
export function isInGarageMarkerArea() {
    const [eX, eY, eZ] = GetEntityCoords(PlayerPedId())
    return getGarage(getGarageInArea(PlayerPedId())).markers.map(marker => {
        return {
            distance: GetDistanceBetweenCoords(marker.x, marker.y, marker.z, eX, eY, eZ, false),
            area: marker.area
        }
    }).some(marker => marker.distance <= f(marker.area))
}

/**
*  draw each garage marker in a garage
* @param markers array of locations
*/
export function drawGarageMarkers(): void {
    getGarage(getGarageInArea(PlayerPedId())).markers.forEach(mark =>
        drawGarageMarker(mark.x, mark.y, mark.z)
    )
}

/**
*  get nearest garage in area
* @param x horizontal position of marker
* @param y vertical position of marker
* @param z z position of marker
* @returns garages with id, distance and area
*/
export function drawGarageMarker(x: number, y: number, z: number) {
    DrawMarker(1, //type
        x, y, z, //local
        0, 0, 0, //direction 
        35, 0, 0, //rotation
        1, 1, 1, //scale
        227, 182, 0, 200, //color
        false, //up and down anim
        false, //face camera
        2, //?
        false, //rotation anim
        null, null, //texture
        false //draw on entities
    )
}

export interface Garage {
    id: string
    name: string
    location: Location
    distance?: number
    markers: Location[]
}

export interface Location {
    x: number
    y: number
    z: number
    area: number
    distance?: number
}