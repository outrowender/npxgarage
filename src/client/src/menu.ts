import * as NativeUI from '../../lib/nativeui/NativeUi'
import { menuOptions, garages } from '../../../src/config'
import { getCarMods } from './vehicle'

export function startMenu(close: (boolean) => void) {

    const vehicle = GetVehiclePedIsUsing(PlayerPedId())

    const menu = new NativeUI.Menu("Wenders Custom", "Seja bem vindo a garagem", new NativeUI.Point(50, 50))

    /*  menu.AddInstructionalButton(new NativeUI.InstructionalButton("To pay respect", 0, "F"))
 
     RegisterCommand("f", () => {
         NativeUI.BigMessage.ShowRankupMessage("You paid respect", "Well done sir", 1337)
     }, false) */

    menu.MenuClose.on(close)

    menuOptions.forEach(menuOption => {
        const item = new NativeUI.UIMenuItem(
            menuOption.title,
            menuOption.info
        )

        const subMenu = new NativeUI.Menu(menuOption.title, menuOption.info, new NativeUI.Point(50, 50))

        const modsCount = getCarMods(menuOption.modId)

        console.log('car mods:', modsCount)

        if (menuOption.children.length > 0 || modsCount > 0) {
            item.RightBadge = NativeUI.BadgeStyle.ArrowRight
            menu.AddSubMenu(subMenu, item)
        } else {
            menu.AddItem(item)
        }

        menuOption.children.forEach(option => {
            subMenu.AddItem(new NativeUI.UIMenuItem(
                option.title,
                option.info
            ))
        })

        for (let index = 0; index < modsCount; index++) {
            subMenu.AddItem(new NativeUI.UIMenuItem(
                GetModTextLabel(vehicle, menuOption.modId, index) || `Variante ${index + 1}`,
                `Variante ${index + 1}`
            ))
        }

        subMenu.IndexChange.on((newIndex: number) => {
            console.log("[SetVehicleVariation] " + `${newIndex}`);
            //GetVehicleModVariation(vehicle, 3)

            SetVehicleMod(vehicle, menuOption.modId, newIndex, true)
        });

        
    })

    menu.IndexChange.on((newIndex: number) => {
        console.log("[SetVehicleModKit] " + `${newIndex}, mod: ${menuOptions[newIndex].name}`);
        SetVehicleModKit(vehicle, menuOptions[newIndex].modId||0)
        //GetVehicleMod(vehicle, menuOptions[newIndex].modId||0)
    });

    menu.Open()
}