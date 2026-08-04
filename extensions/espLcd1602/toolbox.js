/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPLCD1602_CATEGORY}" id="ESPLCD1602_CATEGORY" colour="#0FBD8C" secondaryColour="#0B8E69" iconURI="">
    <block type="espLcd1602_init" id="espLcd1602_init">
        <field name="SDA">21</field>
        <field name="SCL">22</field>
        <field name="ADDR">None</field>
    </block>
    <block type="espLcd1602_showText" id="espLcd1602_showText">
        <field name="ROW">0</field>
        <value name="COL">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="TEXT">
            <shadow type="text">
                <field name="TEXT">Hello</field>
            </shadow>
        </value>
    </block>
    <block type="espLcd1602_clear" id="espLcd1602_clear"></block>
    <block type="espLcd1602_backlight" id="espLcd1602_backlight">
        <field name="STATE">True</field>
    </block>
</category>    `;
}
exports = registerToolboxs;
