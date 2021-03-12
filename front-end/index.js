'use strict'

const contextPath = "http://localhost:8080";
const table = document.getElementById("table-body");
let currentId = 0


function getLoadout() {
    axios.get(contextPath + "/getLoadout")
        .then(res => {
            table.innerHTML = "";

            const loadout = res.data;
            console.log(res);

            loadout.forEach(loadout => {
                const newLoadout = renderLoadout(loadout);
                console.log("New loadout: ", newLoadout);
                table.appendChild(newLoadout);
            });
        }).catch(err => console.error(err))
}

function renderLoadout(loadout) {

    const newRow = document.createElement("tr");


    const newLoadoutName = document.createElement("td");
    newLoadoutName.innerText = loadout.name
    newRow.appendChild(newLoadoutName);

    const newLoadoutPrimaryWeapon = document.createElement("td");
    newLoadoutPrimaryWeapon.innerText = loadout.primaryWeapon
    newRow.appendChild(newLoadoutPrimaryWeapon);

    const newLoadoutSecondaryWeapon = document.createElement("td");
    newLoadoutSecondaryWeapon.innerText = loadout.secondaryWeapon
    newRow.appendChild(newLoadoutSecondaryWeapon);

    const newLoadoutLethal = document.createElement("td");
    newLoadoutLethal.innerText = loadout.lethal
    newRow.appendChild(newLoadoutLethal);

    const newLoadoutTactical = document.createElement("td");
    newLoadoutTactical.innerText = loadout.tactical
    newRow.appendChild(newLoadoutTactical);

    const newLoadoutPerk1 = document.createElement("td");
    newLoadoutPerk1.innerText = loadout.perk1
    newRow.appendChild(newLoadoutPerk1);

    const newLoadoutPerk2 = document.createElement("td");
    newLoadoutPerk2.innerText = loadout.perk2
    newRow.appendChild(newLoadoutPerk2);

    const newLoadoutPerk3 = document.createElement("td");
    newLoadoutPerk3.innerText = loadout.perk3
    newRow.appendChild(newLoadoutPerk3);

    const deleteLoadoutButton = document.createElement("a");
    deleteLoadoutButton.innerText = "Delete";
    deleteLoadoutButton.addEventListener('click', function () {
        deleteLoadout(loadout.id)
    })

    const updateLoadoutButton = document.createElement("a");
    updateLoadoutButton.innerText = " Update";
    updateLoadoutButton.addEventListener('click', function () {
        updateLoadout(loadout.id)
    })

    newRow.appendChild(deleteLoadoutButton);
    newRow.appendChild(updateLoadoutButton)

    return newRow
}


function deleteLoadout(id) {
    axios.delete(contextPath + "/removeLoadout/" + id)
        .then(() => getLoadout())
        .catch(err => console.error(err));
}


function createLoadout() {


    myModal.toggle()
    console.log("create functions please create")
    document.getElementById("createloadoutname").value = ""
    document.getElementById("createloadoutprimaryweapon").value = ""
    document.getElementById("createloadoutsecondaryweapon").value = ""
    document.getElementById("createloadoutletahl").value = ""
    document.getElementById("createloadouttactical").value = ""
    document.getElementById("createloadoutperk1").value = ""
    document.getElementById("createloadoutperk2").value = ""
    document.getElementById("createloadoutperk3").value = ""
}

var myModal = new bootstrap.Modal(document.getElementById('createModal'));

document.getElementById("createLoadoutForm").addEventListener('submit', function createLoadout(event) {
    event.preventDefault();

    const data = {
        name: this.name.value,
        primaryWeapon: this.primaryWeapon.value,
        secondaryWeapon: this.secondaryWeapon.value,
        lethal: this.lethal.value,
        tactical: this.tactical.value,
        perk1: this.perk1.value,
        perk2: this.perk2.value,
        perk3: this.perk3.value
    };

    axios.post(contextPath + "/createLoadout/", data, {
        headers: {
            "content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(() => {
        this.reset();
        this.name.focus();
        getLoadout();
    })
        .catch(err => console.error(err));
})

function updateLoadout(id) {
    //change content of the modal
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.toggle()
    console.log("yo what up")
    axios.get(contextPath + "/getLoadout/" + id).then(res => {
        document.getElementById("loadoutid").value = id
        document.getElementById("updateloadoutname").value = res.data.name
        document.getElementById("updateloadoutprimaryweapon").value = res.data.primaryWeapon
        document.getElementById("updateloadoutsecondaryweapon").value = res.data.secondaryWeapon
        document.getElementById("updateloadoutletahl").value = res.data.lethal
        document.getElementById("updateloadouttactical").value = res.data.tactical
        document.getElementById("updateloadoutperk1").value = res.data.perk1
        document.getElementById("updateloadoutperk2").value = res.data.perk2
        document.getElementById("updateloadoutperk3").value = res.data.perk3
    })
    //open the modal
    currentId = id
    console.log(id)

}

document.getElementById("updateLoadoutForm").addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("howdy doodle")
    const data = {
        name: this.name.value,
        primaryWeapon: this.primaryWeapon.value,
        secondaryWeapon: this.secondaryWeapon.value,
        lethal: this.lethal.value,
        tactical: this.tactical.value,
        perk1: this.perk1.value,
        perk2: this.perk2.value,
        perk3: this.perk3.value
    };



    axios.put(contextPath + "/updateLoadout/" + currentId, data, {
        headers: {
            "content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(() => {
        this.reset();
        this.name.focus();
        getLoadout();
    })
        .catch(err => console.error(err));
})
getLoadout();