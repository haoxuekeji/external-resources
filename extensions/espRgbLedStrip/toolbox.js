/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPRGBLEDSTRIP_CATEGORY}" id="ESPRGBLEDSTRIP_CATEGORY" colour="#7700FF" secondaryColour="#4400B3" iconURI="">
    <block type="espRgbLedStrip_init" id="espRgbLedStrip_init">
        <field name="PIN">4</field>
        <value name="LEN">
            <shadow type="math_whole_number">
                <field name="NUM">16</field>
            </shadow>
        </value>
    </block>
    <block type="espRgbLedStrip_setPixelColor" id="espRgbLedStrip_setPixelColor">
        <field name="PIN">4</field>
        <value name="NO">
            <shadow type="math_whole_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
    </block>
    <block type="espRgbLedStrip_fill" id="espRgbLedStrip_fill">
        <field name="PIN">4</field>
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
    </block>
    <block type="espRgbLedStrip_setBrightness" id="espRgbLedStrip_setBrightness">
        <field name="PIN">4</field>
        <value name="BRT">
            <shadow type="math_whole_number">
                <field name="NUM">30</field>
            </shadow>
        </value>
    </block>
    <block type="espRgbLedStrip_clear" id="espRgbLedStrip_clear">
        <field name="PIN">4</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
