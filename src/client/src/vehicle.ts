export function getCarMods(mod: number) {
    const vehicle = GetVehiclePedIsUsing(PlayerPedId())
    return GetNumVehicleMods(vehicle, mod)
}