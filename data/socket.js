		

function onMessage(event) {
    var d = JSON.parse(event.data);
    if (d.status === undefined) {console.log("RX: " + event.data);}

    //RAW-RX
    if (d.monitor) {
        f = d.monitor;
        var msg = "<span ";
        if (d.monitor.tx == true) {
            msg += "style='color: darkred;'> ";
        } else {
            msg += ">";
        }
        //Port
        msg += f.port + ": ";
        //Zeit
        const date = new Date(d.monitor.timestamp * 1000);
        msg += date.toLocaleString("de-DE", {hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(",", "") + " ";		
        //Lesbar anzeigen
        if (typeof f.nodeCall !== "undefined") { msg += "<b>" + f.nodeCall + "</b> > "; }
        if (typeof f.viaCall !== "undefined") { msg += "<b>" + f.viaCall + "</b> "; }
        if (typeof f.hopCount !== "undefined") { 
            if (f.hopCount > 0) { 
                msg += "H" + f.hopCount + " "; 
            }
        }
        switch (f.frameType) {
            case 0x00: msg += "Announce"; break;
            case 0x01: msg += "Announce ACK"; break;
            case 0x02: msg += "Tuning"; break;
            case 0x03: 
            case 0x05: 
                msg += "Message"; 
                if (f.messageType == 0) {msg += ", [TEXT] ";}
                if (f.messageType == 1) {msg += ", [TRACE] ";}
                if (f.messageType == 15) {msg += ", [COMMAND] ";}
                if (f.id) { msg += "ID: <b>" + f.id + "</b> "; }
                if (f.srcCall) { msg += "SRC: <b>" + f.srcCall + "</b> "; }
                if (f.dstCall) { msg += "DST: <b>" + f.dstCall + "</b> "; }
                if (f.text) {
                    msg += "MSG: <b>" + f.text + "</b>";
                }
                break;
            case 0x04: 
                msg += "Message ACK "; 
                if (f.id > 0) { msg += "ID: <b>" + f.id + "</b> "; }
                break;
        }
        // document.getElementById("monitor").innerHTML = document.getElementById("monitor").innerHTML + "</span><br>" + msg;
        // document.getElementById('monitor').scrollTop = document.getElementById("monitor").scrollHeight;
    
    }

    //Message empfangen
    if (d.message) {
        messages.push(d.message);
        showMessages(d.message);
    }

    //Peers
    if (d.peerlist) {
        // var peers = "";
        // peers += "<table>";
        // peers += "<tr> <td>Port</td> <td>Call</td> <td>Last RX</td> <td>RSSI</td> <td>SNR</td> <td>Frq. Error</td> <td>Available</td> </tr>";
        // if (d.peerlist.peers) {
        //     d.peerlist.peers.forEach(function(p, index) {
        //         const lastRX = new Date(p.timestamp * 1000);
        //         peers += "<tr>";
        //         peers += "<td>" + p.port + "</td>";
        //         peers += "<td>" + p.call + "</td>";
        //         peers += "<td>" + lastRX.toLocaleTimeString('de-DE') + "</td>";
        //         peers += "<td>" + p.rssi + "</td>";
        //         peers += "<td>" + p.snr + "</td>";
        //         peers += "<td>" + parseInt(p.frqError) + "</td>";
        //         peers += "<td>" + p.available + "</td>";
        //         peers += "</tr>";
        //     });
        // }
        // peers += "</table>";
        // document.getElementById("peers").innerHTML = peers;
    }

    //Einstellungen
    if (d.settings) {
        // document.getElementById("settingsMycall").value = d.settings.mycall;
        // document.getElementById("settingsNTP").value = d.settings.ntp;
        // document.getElementById("settingsSSID").value = d.settings.wifiSSID;
        // document.getElementById("settingsPassword").value = d.settings.wifiPassword;
        // document.getElementById("settingsWiFiIP").value = d.settings.wifiIP[0] + "." + d.settings.wifiIP[1] + "." + d.settings.wifiIP[2] + "." + d.settings.wifiIP[3];
        // document.getElementById("settingsWifiNetMask").value = d.settings.wifiNetMask[0] + "." + d.settings.wifiNetMask[1] + "." + d.settings.wifiNetMask[2] + "." + d.settings.wifiNetMask[3];
        // document.getElementById("settingsWifiGateway").value = d.settings.wifiGateway[0] + "." + d.settings.wifiGateway[1] + "." + d.settings.wifiGateway[2] + "." + d.settings.wifiGateway[3];
        // document.getElementById("settingsWifiDNS").value = d.settings.wifiDNS[0] + "." + d.settings.wifiDNS[1] + "." + d.settings.wifiDNS[2] + "." + d.settings.wifiDNS[3];
        // document.getElementById("settingsWifiBrodcast").value = d.settings.wifiBrodcast[0] + "." + d.settings.wifiBrodcast[1] + "." + d.settings.wifiBrodcast[2] + "." + d.settings.wifiBrodcast[3];
        // document.getElementById("settingsDHCP").checked = d.settings.dhcpActive; 
        // document.getElementById("settingsApMode").checked = d.settings.apMode; 
        // document.getElementById("settingsLoraFrequency").value = d.settings.loraFrequency; 
        // document.getElementById("settingsLoraOutputPower").value = d.settings.loraOutputPower; 
        // document.getElementById("settingsLoraBandwidth").value = d.settings.loraBandwidth; 
        // document.getElementById("settingsLoraSyncWord").value = d.settings.loraSyncWord.toString(16).padStart(2, '0').toUpperCase(); 
        // document.getElementById("settingsLoraCodingRate").value = d.settings.loraCodingRate; 
        // document.getElementById("settingsLoraSpreadingFactor").value = d.settings.loraSpreadingFactor; 
        // document.getElementById("settingsLoraPreambleLength").value = d.settings.loraPreambleLength; 
        // document.title = d.settings.name + " " + d.settings.version + " " + d.settings.mycall;
        // document.getElementById("settingsLoraRepeat").checked = d.settings.loraRepeat; 
        // document.getElementById("settingsLoraMaxMessageLength").innerHTML = d.settings.loraMaxMessageLength; 
        // settingsVisibility();
    }

    //Status
    if (d.status) {
        drawClock(new Date(d.status.time * 1000));
        // if (d.status.rx) {
        //     document.getElementById("statusRX").innerHTML = d.status.rx; 
        //     document.getElementById("statusRX").style.color = "darkgreen";
        //     document.getElementById("statusRX").style.fontWeight = "bold";
        // } else {
        //     document.getElementById("statusRX").innerHTML = d.status.rx; 
        //     document.getElementById("statusRX").style.color = "";
        //     document.getElementById("statusRX").style.fontWeight = "";
        // }
        // if (d.status.tx) {
        //     document.getElementById("statusTX").innerHTML = d.status.tx; 
        //     document.getElementById("statusTX").style.color = "darkred";
        //     document.getElementById("statusTX").style.fontWeight = "bold";
        // } else {
        //     document.getElementById("statusTX").innerHTML = d.status.tx; 
        //     document.getElementById("statusTX").style.color = "";
        //     document.getElementById("statusTX").style.fontWeight = "";
        // }
        // document.getElementById("statusTxBufferCount").innerHTML = d.status.txBufferCount; 

    }

    //WiFi Scan
    if (d.wifiScan) {
        // const select = document.getElementById('settingsSSIDList');
        // select.length = 0;
        // d.wifiScan.forEach(n => {
        //     let opt = document.createElement('option');
        //     opt.value = n.ssid;
        //     opt.text = n.ssid + " (" + n.encryption + ", " + n.rssi +  "dBm)";
        //     select.add(opt);
        // });
    }


}		



function showMessages() {
    var msg = "";
    messages.forEach(function(m) {

        if ((m.messageType == 0) || (m.messageType == 1)) { //nur TEXT & TRACE Nachrichten
            if (m.dstCall.length == 0) {m.dstCall = "all";}

            msg += "<span ";
            if (m.tx == true) {
                msg += "style='color: darkred;'> ";
            } else {
                msg += "> ";
            }
            const date = new Date(m.timestamp * 1000);
            msg += date.toLocaleString("de-DE", {day: "2-digit",  month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).replace(",", "") + " ";		
            msg += m.srcCall;
            if (m.dstCall)  {msg += " " + m.dstCall; }
            if (m.messageType == 1) {msg += " [TRACE] ";}
            msg += ": <b>" + m.text + "</b>";
            msg += "</span><br>"
        }

        //document.getElementById("messages").innerHTML = msg;                     
        //document.getElementById('messages').scrollTop = document.getElementById("messages").scrollHeight;			

    });
}



function initWebSocket() {
    var baseURL = "";
    var gateway = "";

    //Debug
    if (!window.location.hostname.includes("127.0.0.1")) {
        gateway = `ws://${window.location.hostname}/socket`;
        baseURL = "";
    } else {
        gateway = "ws://192.168.33.60/socket";
        baseURL = "http://192.168.33.60/"
    }

    //document.getElementById("messages").innerHTML = document.getElementById("monitor").innerHTML = "";

    //messages.json laden und parsen
   // document.getElementById("messages").innerHTML = document.getElementById("messages").innerHTML = "";
    fetch(baseURL + "messages.json", )
        .then(response => response.text())
        .then(text => {
            const lines = text.split(/\r?\n/);
            lines.forEach(line => {
                if (line.trim().length === 0) return;
                const m = JSON.parse(line);
                messages.push(m.message);
        });
        showMessages();
    });				

    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    //sendWS(JSON.stringify({scanWifi: true }));
    keepAlive();
}

function onClose(event) {
    clearTimeout(timeout);
    setTimeout(initWebSocket, 500);
}

function sendWS(text) {
    websocket.send(text);
    console.log("TX: " + text);
}

function keepAlive() { 
    if (websocket.readyState == websocket.OPEN) {  
        websocket.send(JSON.stringify({ping: new Date() }));
    }  
    timeout = setTimeout(keepAlive, 1000);  
}
