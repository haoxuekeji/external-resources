// ArduinoJson - arduinojson.org
// Copyright Benoit Blanchon 2014-2018
// MIT License

#include <ArduinoJson6_8.h>
#include <catch.hpp>

TEST_CASE("JsonArray::copyTo()") {
  DynamicJsonDocument doc(4096);

  SECTION("BiggerOneDimensionIntegerArray") {
    char json[] = "[1,2,3]";
    DeserializationError err = deserializeJson(doc, json);
    REQUIRE(err == DeserializationError::Ok);
    JsonArray array = doc.as<JsonArray>();

    int destination[4] = {0};
    size_t result = array.copyTo(destination);

    REQUIRE(3 == result);
    REQUIRE(1 == destination[0]);
    REQUIRE(2 == destination[1]);
    REQUIRE(3 == destination[2]);
    REQUIRE(0 == destination[3]);
  }

  SECTION("SmallerOneDimensionIntegerArray") {
    char json[] = "[1,2,3]";
    DeserializationError err = deserializeJson(doc, json);
    REQUIRE(err == DeserializationError::Ok);
    JsonArray array = doc.as<JsonArray>();

    int destination[2] = {0};
    size_t result = array.copyTo(destination);

    REQUIRE(2 == result);
    REQUIRE(1 == destination[0]);
    REQUIRE(2 == destination[1]);
  }

  SECTION("TwoOneDimensionIntegerArray") {
    char json[] = "[[1,2],[3],[4]]";

    DeserializationError err = deserializeJson(doc, json);
    REQUIRE(err == DeserializationError::Ok);
    JsonArray array = doc.as<JsonArray>();

    int destination[3][2] = {{0}};
    array.copyTo(destination);

    REQUIRE(1 == destination[0][0]);
    REQUIRE(2 == destination[0][1]);
    REQUIRE(3 == destination[1][0]);
    REQUIRE(0 == destination[1][1]);
    REQUIRE(4 == destination[2][0]);
    REQUIRE(0 == destination[2][1]);
  }
}
