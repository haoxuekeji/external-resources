/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPBME280_CATEGORY}" id="ESPBME280_CATEGORY" colour="#4C97FF" secondaryColour="#3373CC" iconURI="">
    <block type="espBme280_init" id="espBme280_init">
        <field name="SDA">21</field>
        <field name="SCL">22</field>
    </block>
    <block type="espBme280_temperature" id="espBme280_temperature"></block>
    <block type="espBme280_humidity" id="espBme280_humidity"></block>
    <block type="espBme280_pressure" id="espBme280_pressure"></block>
    <block type="espBme280_altitude" id="espBme280_altitude"></block>
</category>    `;
}
exports = registerToolboxs;
