// ==========================
// LOGIN CHECK
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    if(sessionStorage.getItem("loggedIn") !== "true"){
        window.location.href = "index.html";
        return;
    }

    document.getElementById("username").innerText =
        sessionStorage.getItem("username") || "Admin";

    loadDevices();

    loadBandwidth();

    startClock();

});

// ==========================
// CLOCK
// ==========================

function startClock(){

    setInterval(() => {

        const now = new Date();

        document.getElementById(
            "currentTime"
        ).innerHTML =
        now.toLocaleString();

    },1000);

}

// ==========================
// FAKE DEVICES
// ==========================

const devices = [

{
name:"Internet Gateway",
ip:"192.168.1.1"
},

{
name:"Core Switch Aruba",
ip:"10.10.1.1"
},

{
name:"Firewall",
ip:"10.10.1.254"
},

{
name:"VMware vCenter",
ip:"10.10.50.10"
},

{
name:"OPERA PMS",
ip:"10.10.20.10"
},

{
name:"Simphony POS",
ip:"10.10.20.20"
},

{
name:"NVR CCTV",
ip:"10.10.30.10"
}

];

// ==========================
// DEVICE MONITOR
// ==========================

function loadDevices(){

    let html = "";

    let online = 0;
    let offline = 0;

    devices.forEach(device => {

        const latency =
        Math.floor(
            Math.random()*20
        ) + 1;

        const status =
        Math.random() > 0.05;

        if(status){
            online++;
        }else{
            offline++;
        }

        html += `

        <tr>

        <td>${device.name}</td>

        <td>${device.ip}</td>

        <td>

        <span class="
        badge bg-${
        status
        ?
        "success"
        :
        "danger"
        }">

        ${
        status
        ?
        "Online"
        :
        "Offline"
        }

        </span>

        </td>

        <td>

        ${
        status
        ?
        latency + " ms"
        :
        "-"
        }

        </td>

        </tr>

        `;

    });

    document.getElementById(
        "networkTable"
    ).innerHTML = html;

    document.getElementById(
        "onlineDevices"
    ).innerHTML = online;

    document.getElementById(
        "offlineDevices"
    ).innerHTML = offline;

}

setInterval(
    loadDevices,
    15000
);

// ==========================
// BANDWIDTH
// ==========================

function loadBandwidth(){

    const download =
    Math.floor(
        Math.random()*100
    );

    const upload =
    Math.floor(
        Math.random()*40
    );

    const users =
    Math.floor(
        Math.random()*300
    ) + 80;

    document.getElementById(
        "downloadSpeed"
    ).innerHTML =
    download + " Mbps";

    document.getElementById(
        "uploadSpeed"
    ).innerHTML =
    upload + " Mbps";

    document.getElementById(
        "wifiUsers"
    ).innerHTML =
    users;

    document.getElementById(
        "internetStatus"
    ).innerHTML =

    `<span class="badge bg-success">
        Online
    </span>`;

    updateChart(
        download,
        upload
    );

}

setInterval(
    loadBandwidth,
    5000
);

// ==========================
// CHART
// ==========================

let labels = [];
let downloadData = [];
let uploadData = [];

const ctx =
document.getElementById(
    "networkChart"
);

const chart =
new Chart(ctx, {

    type:"line",

    data:{

        labels:labels,

        datasets:[

        {

        label:"Download",

        data:downloadData,

        borderColor:"#0d6efd",

        backgroundColor:
        "rgba(13,110,253,.1)",

        tension:0.4,

        fill:true

        },

        {

        label:"Upload",

        data:uploadData,

        borderColor:"#198754",

        backgroundColor:
        "rgba(25,135,84,.1)",

        tension:0.4,

        fill:true

        }

        ]

    },

    options:{

        responsive:true,

        maintainAspectRatio:false

    }

});

function updateChart(
download,
upload
){

    labels.push(
        new Date()
        .toLocaleTimeString()
    );

    downloadData.push(
        download
    );

    uploadData.push(
        upload
    );

    if(labels.length > 15){

        labels.shift();

        downloadData.shift();

        uploadData.shift();

    }

    chart.update();

}

// ==========================
// DARK MODE
// ==========================

function toggleTheme(){

    document.body
    .classList.toggle(
        "dark-mode"
    );

}

// ==========================
// LOGOUT
// ==========================

function logout(){

    if(confirm(
        "Logout ?"
    )){

        sessionStorage.clear();

        window.location.href =
        "index.html";

    }

}
