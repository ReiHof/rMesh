#include "frame.h"

#include <ArduinoJson.h>

size_t Frame::exportBinary(uint8_t* data, size_t length) {
    //Binär-Daten erzeugen
    size_t position = 0;
    //Frame-Typ text
    data[position] = frameType & 0x0F;
    data[position] = data[position] | (hopCount & 0x0F) << 4;
    position ++;
    //Absender hinzufügen
    if (strlen(srcCall) > 0) {
        data[position] = Frame::HeaderTypes::SRC_CALL_HEADER << 4 | (0x0F & strlen(srcCall));  
        position ++;
        memcpy(&data[position], srcCall, strlen(srcCall)); //Payload
        position += strlen(srcCall);
    }
    //Node hinzufügen
    if (strlen(nodeCall) > 0) {
        data[position] = Frame::HeaderTypes::NODE_CALL_HEADER << 4 | (0x0F & strlen(nodeCall));  
        position ++;
        memcpy(&data[position], nodeCall, strlen(nodeCall)); //Payload
        position += strlen(nodeCall);
    }
    //VIA-Call hinzufügen
    if (strlen(viaCall) > 0) {
        data[position] = Frame::HeaderTypes::VIA_CALL_HEADER << 4 | (0x0F & strlen(viaCall));  
        position ++;
        memcpy(&data[position], viaCall, strlen(viaCall)); //Payload
        position += strlen(viaCall);
    }
    //Destination hinzufügen
    if (strlen(dstCall) > 0) {
        data[position] = Frame::HeaderTypes::DST_CALL_HEADER << 4 | (0x0F & strlen(dstCall));  
        position ++;
        memcpy(&data[position], dstCall, strlen(dstCall)); //Payload
        position += strlen(dstCall);
    }
    //Message hinzu (muss immer ganz hinten sein, weil keine Längenangabe)
    switch (frameType) {
        case Frame::FrameTypes::MESSAGE_FRAME:
        case Frame::FrameTypes::MESSAGE_ACK_FRAME:
            //Normale Message Frames
            //TYP
            data[position] = Frame::HeaderTypes::MESSAGE_HEADER << 4;     
            data[position] = data[position] | messageType;               
            position ++;
            //ID
            memcpy(&data[position], &id, sizeof(id)); //Payload
            position += sizeof(id);
            //Message kopieren
            if (messageLength > (length - position)) { messageLength = length - position; }
            memcpy(&data[position], &message, messageLength); //Payload
            position += messageLength;    
            break;        
        case Frame::FrameTypes::TUNE_FRAME:
            while (position < 255) {
                data[position] = 0xFF;
                position ++;
            }
            break;
    }
    return position;
}

size_t Frame::monitorJSON(char* buffer, size_t length) {
    //Schreibt Monitor-Daten in JSON-Buffer
    JsonDocument doc;
    for (size_t i = 0; i < messageLength; i++) {
        doc["monitor"]["message"][i] = message[i];
    }    
    char text[messageLength + 1] = {0};
    strncpy(text, (char*)message, messageLength);
    doc["monitor"]["text"] = text;
    doc["monitor"]["messageType"] = messageType;
    doc["monitor"]["messageLength"] = messageLength;
    doc["monitor"]["tx"] = tx;
    doc["monitor"]["rssi"] = rssi;
    doc["monitor"]["snr"] = snr;
    doc["monitor"]["frequencyError"] = frqError;
    doc["monitor"]["time"] = timestamp;
    doc["monitor"]["srcCall"] = srcCall;
    doc["monitor"]["dstCall"] = dstCall;
    doc["monitor"]["viaCall"] = viaCall;
    doc["monitor"]["nodeCall"] = nodeCall;
    doc["monitor"]["frameType"] = frameType;
    doc["monitor"]["id"] = id;
    doc["monitor"]["hopCount"] = hopCount;
    doc["monitor"]["initRetry"] = initRetry;
    doc["monitor"]["retry"] = retry;
    size_t len = serializeJson(doc, buffer, length);
    return len;
}

size_t Frame::messageJSON(char* buffer, size_t length) {
    //Schreibt Message-Daten in JSON-Buffer
    JsonDocument doc;
    for (size_t i = 0; i < messageLength; i++) {
        doc["message"]["message"][i] = message[i];
    }    
    char text[messageLength + 1] = {0};
    strncpy(text, (char*)message, messageLength);
    doc["message"]["text"] = text;
    doc["message"]["messageType"] = messageType;
    doc["message"]["srcCall"] = srcCall;
    doc["message"]["dstCall"] = dstCall;
    doc["message"]["id"] = id;
    doc["message"]["tx"] = tx;
    doc["message"]["time"] = timestamp;
    size_t len = serializeJson(doc, buffer, length);
    return len;
}


void Frame::importBinary(uint8_t* data, size_t length) {

    tx = false;

}