import { Observable, BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators';
import { isInGarageArea, drawGarageMarkers, getGarageInArea, getGarage, isInGarageMarkerArea, isPedInGarageWithaCar } from './src/garage'

var isInGarage = new BehaviorSubject<boolean>(false)
var isMechanic = new BehaviorSubject<boolean>(false)

async function startup() {

    isInGarage.next(isPedInGarageWithaCar())

    if (!isInGarage.value) return
    const garage = getGarageInArea(PlayerPedId())

    if (!garage) return console.log('is not a garage!')

    if (isMechanic.value) console.log('é mecanico')

    const garageDetail = getGarage(garage)

    //desenha os marcadores caso esteja em uma mecânica
    drawGarageMarkers(garageDetail.markers)

    if (!isInGarageMarkerArea(garageDetail.markers)) {

    }
}





isInGarage
    .pipe(
        //distingue enventos de entrada e saida do carro da garagem
        distinctUntilChanged()
    )
    .subscribe(value => {
        //faz alguma coisa
        console.log('is in garage?', value)
    })


// lab
setTick(startup)