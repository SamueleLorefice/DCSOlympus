import { ConvertDDToDMS, rad2deg } from 'Other/Utils.js'

export class UnitInfoPanel
{
    #panel: HTMLElement;
    
    constructor(id)
    {
        this.#panel = document.getElementById(id); 
    }

    update(selectedUnits)
    {
        if (selectedUnits.length == 1)
        {
            this.#panel.style.bottom = "15px";
            this.#showUnitData(selectedUnits[0]);
        }
        else
        {
            this.#panel.style.bottom = (-this.#panel.offsetHeight - 2) + "px";
            this.#showUnitData(undefined); // Empty, cleans the panel
        }
    }

    #showUnitData(selectedUnit)
    {
        if (selectedUnit !== undefined)
        {
            var loadout = "";
            for (let index in selectedUnit.missionData.ammo)
            {
                if (selectedUnit.missionData != undefined)
                {
                    var ammo = selectedUnit.missionData.ammo[index];
                    var displayName = ammo.desc.displayName;
                    var amount = ammo.count;
                    loadout += amount + "x" + displayName;
                    if (parseInt(index) < Object.keys(selectedUnit.missionData.ammo).length)
                    {
                        loadout += ", ";
                    }
                }
            }
            
            this.#panel.innerHTML = `
            <div style="display: flex">
            <table class="panel-table" id="unit-info-table">
                <tr>
                    <td colspan="4" class="panel-title">
                        UNIT INFO
                    </td>
                </tr>
                <tr>
                    <td class="panel-label">
                        Name: 
                    </td>
                    <td class="panel-content">
                        ${selectedUnit.unitName}
                    </td>
                    <td class="panel-label">
                        Group: 
                    </td>
                    <td class="panel-content">
                        ${selectedUnit.groupName}
                    </td>
                </tr>
                <tr>
                    <td class="panel-label">
                        Heading:
                    </td>
                    <td class="panel-content">
                        ${Math.floor(rad2deg(selectedUnit.heading)) + "°"}
                    </td>
                    <td class="panel-label">
                        Altitude:
                    </td>
                    <td class="panel-content">
                        ${Math.floor(selectedUnit.altitude / 0.3048) + "ft"}
                    </td>
                </tr>
                <tr>
                    <td class="panel-label">
                        Ground speed:
                    </td>
                    <td class="panel-content">
                        ${Math.floor(selectedUnit.speed * 1.94384) + "kts"}
                    </td>
                    <td class="panel-label">
                        Fuel:
                    </td>
                    <td class="panel-content">
                        ${Math.floor(selectedUnit.missionData.fuel * 100) + "%"}
                    </td>
                </tr>
                <tr>
                <td class="panel-label">
                    Position:
                </td>
                <td class="panel-content" colspan="3">
                    ${ConvertDDToDMS(selectedUnit.latitude, false) + " " + ConvertDDToDMS(selectedUnit.longitude, true)}
                </td>
                <td>
                </td>
            </tr>
            </table>
            <table class="panel-table" id="tactical-info-table">
                <tr>
                    <td colspan="4" class="panel-title">
                        TACTICAL INFO
                    </td>
                </tr>
                <tr>
                <td class="panel-label">
                    Current task:
                </td>
                <td class="panel-content" colspan="3">
                    ${selectedUnit.currentTask}
                </td>
                </tr>
                <tr>
                <td class="panel-label">
                    Weapons:
                </td>
                <td class="panel-content" colspan="3">
                    ${loadout}
                </td>
                </tr>
                <tr>
                    
                </tr>
                <tr>
                
                </td>
            </tr>
            </table>
            </div>
            `;     
        }
        else
        {
            this.#panel.innerHTML = ``;
        }
    }
}