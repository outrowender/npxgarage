import { BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { drawGarageMarkers, getGarageInArea, getGarage, isInGarageMarkerArea, isPedInGarageWithaCar } from './src/garage'
import * as NativeUI from '../lib/nativeui/NativeUi';

var isInNearGarage = new BehaviorSubject<boolean>(false)
var isInGarage = new BehaviorSubject<boolean>(false)
var isMechanic = false

//o inicio do frame
async function startup() {

    //a cada frame verifica se o pedestre está em um carro e próxino a uma mecanica
    isInNearGarage.next(isPedInGarageWithaCar())

    if (isInNearGarage.value == false || isMechanic == false) return

    //desenha os marcadores caso esteja em uma mecânica
    drawGarageMarkers()

    isInGarage.next(isInGarageMarkerArea())

    if (isInGarage.value == true) {

        if (IsControlJustPressed(1, 201)) {
            console.log('apertou enter')
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
})

onNet('canCustomizeEventHandler', value => {
    console.log(`canCustomizeEventHandler: ${value.canCustomize}`)

    //SetPlayerControl(PlayerId(), false, 256)

    const menu = new NativeUI.Menu("Wenders Custom", "customiza essa merda ai", new NativeUI.Point(50, 50));


    // Instructional buttons
    let respectButton = new NativeUI.InstructionalButton("To pay respect", 0, "F");
    menu.AddInstructionalButton(respectButton);

    // Menu Items
    menu.AddItem(new NativeUI.UIMenuListItem(
        "List Item",
        "Description for List Item",
        new NativeUI.ItemsCollection(["Item 1", "Item 2", "Item 3"])
    ));

    menu.AddItem(new NativeUI.UIMenuSliderItem(
        "Slider Item",
        ["Fugiat", "pariatur", "consectetur", "ex", "duis", "magna", "nostrud", "et", "dolor", "laboris"],
        5,
        "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
        true
    ));

    menu.AddItem(new NativeUI.UIMenuCheckboxItem(
        "Checkbox Item",
        false,
        "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint."
    ));

    menu.AddItem(new NativeUI.UIMenuItem(
        "Dumb menu item",
        "Just a menu item description"
    ));

    menu.Open()


    DisplayRadar(false)


})


// da start ao tick
setTick(startup)