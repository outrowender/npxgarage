import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { drawGarageMarkers, getGarageInArea, getGarage, isInGarageMarkerArea, isPedInGarageWithaCar } from './src/garage'
import * as NativeUI from '../lib/nativeui/NativeUi';
import { startMenu } from './src/menu';

var isInNearGarage = new BehaviorSubject<boolean>(false)
var isInGarage = new BehaviorSubject<boolean>(false)
var isMechanic = false
var isCustomizing = false

//o inicio do frame
async function startup() {
    if (isCustomizing) return

    //a cada frame verifica se o pedestre está em um carro e próxino a uma mecanica
    isInNearGarage.next(isPedInGarageWithaCar())

    if (isInNearGarage.value == false || isMechanic == false) return

    //desenha os marcadores caso esteja em uma mecânica
    drawGarageMarkers()

    isInGarage.next(isInGarageMarkerArea())

    if (isInGarage.value == true) {

        if (IsControlJustPressed(1, 46)) {
            console.log('apertou E')
            emitNet('canCustomizeEvent')
        }
    }

}

//distingue as entradas de estar ou nao perto da mecanica
isInNearGarage
    .pipe(
        //distingue enventos de entrada e saida do carro da garagem
        distinctUntilChanged()
    )
    .subscribe(value => {
        //se estiver na garagem, verifica com o servidor as permissoes
        if (value) setImmediate(() => emitNet('userIsMechanicEvent'))
        else isInGarage.next(false)
    })

//distingue as entradas de estar ou nao perto da mecanica
isInGarage
    .pipe(
        //distingue enventos de entrada e saida do carro da garagem
        distinctUntilChanged()
    )
    .subscribe(value => {

        console.log('esta na garagem marcador', value)

        //se estiver na garagem, verifica com o servidor as permissoes
        //if (value) setImmediate(() => emitNet('userIsMechanicEvent'))

    })

onNet('userIsMechanicEventHandler', value => {
    console.log(`userIsMechanicEventHandler: ${value.isMechanic}`)

    isMechanic = value.isMechanic


    SetNotificationTextEntry('STRING')
    AddTextComponentString('venha customizar com a gente')
    DrawNotification(false, false)
})

onNet('canCustomizeEventHandler', value => {
    console.log(`canCustomizeEventHandler: ${value.canCustomize}`)

    if (!value.canCustomize) return

    isCustomizing = true

    //SetPlayerControl(PlayerId(), false, 256)
    DisplayRadar(false)

    Wait(500)
    startMenu((onclose) => {
        isCustomizing = false
        //SetPlayerControl(PlayerId(), true, 256)
        DisplayRadar(true)
    })

})


// da start ao tick
setTick(startup)