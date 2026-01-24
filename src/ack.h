#pragma once

#include <Arduino.h>

bool checkACK(const char* srcCall, const char* nodeCall, const uint32_t id);
void addACK(const char* srcCall, const char* nodeCall, const uint32_t id);


