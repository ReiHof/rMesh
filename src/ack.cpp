#include <Arduino.h>
#include <LittleFS.h>
#include <ArduinoJson.h>


#include "ack.h"
#include "helperFunctions.h"

void addACK(const char* srcCall, const char* nodeCall, const uint32_t id) {
    //Prüfen, ob ACK Frame bereits vorhanden
    bool found =  checkACK(srcCall, nodeCall, id);

    //Message ACK in Datei speichern
    if (found == false) {
        JsonDocument doc;
        doc["srcCall"] = srcCall;
        doc["nodeCall"] = nodeCall;
        doc["id"] = id;
        char* jsonBuffer = (char*)malloc(1024);
        size_t len = serializeJson(doc, jsonBuffer, 1024);
        addJSONtoFile(jsonBuffer, len, "/ack.json", MAX_STORED_ACK);
        free(jsonBuffer);
        jsonBuffer = nullptr;
    }
}


bool checkACK(const char* srcCall, const char* nodeCall, const uint32_t id) {
    //Prüfen, ob ACK Frame bereits vorhanden
    File file = LittleFS.open("/ack.json", "r");
    bool found = false;
    if (file) {
        JsonDocument doc;
        while (file.available()) {
            DeserializationError error = deserializeJson(doc, file);
            if (error == DeserializationError::Ok) {
                if ((doc["id"].as<uint32_t>() == id) && (strcmp(doc["srcCall"], srcCall) == 0) && (strcmp(doc["nodeCall"], nodeCall) == 0)) {
                    found = true;
                    break; 
                }
            } else if (error != DeserializationError::EmptyInput) {
                file.readStringUntil('\n');
            }
        }
        file.close();                    
    }
    return found;
}

