import { garages } from '../config'
import { sleep, f, drawText } from '../utils';

async function startup() {

    const ped = PlayerPedId()

    if (IsPedAPlayer(ped) && IsPedSittingInAnyVehicle(ped)) {

        const veh = GetVehiclePedIsUsing(ped)
        const entity = GetEntityModel(veh)

        if (IsThisModelACar(entity)) {

            const [x, y, z] = GetEntityCoords(ped)

            garages.map(m => m.location).forEach(garage => {
                const distance = GetDistanceBetweenCoords(garage.x, garage.y, garage.z, x, y, z, true)
                if(distance <= f(5)){
                    SetNotificationMessage("CHAR_CARSITE3", "CHAR_CARSITE3", false, 4, "seja bem vindo", "Bem vindo")
                    DrawNotification(true,false)
                }

            })

        }
    }
}

// lab
setTick(startup)