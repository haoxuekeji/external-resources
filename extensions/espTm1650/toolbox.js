/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPTM1650_CATEGORY}" id="ESPTM1650_CATEGORY" colour="#FF6680" secondaryColour="#D94C66" iconURI="">
    <block type="espTm1650_init" id="espTm1650_init">
        <field name="SDA">21</field>
        <field name="SCL">22</field>
        <field name="BRIGHTNESS">4</field>
    </block>
    <block type="espTm1650_showNumber" id="espTm1650_showNumber">
        <value name="NUMBER">
            <shadow type="math_number">
                <field name="NUM">1234</field>
            </shadow>
        </value>
        <field name="DECIMALS">0</field>
    </block>
    <block type="espTm1650_showText" id="espTm1650_showText">
        <value name="TEXT">
            <shadow type="text">
                <field name="TEXT">AbCd</field>
            </shadow>
        </value>
    </block>
    <block type="espTm1650_showAt" id="espTm1650_showAt">
        <value name="CHAR">
            <shadow type="text">
                <field name="TEXT">8</field>
            </shadow>
        </value>
        <field name="POSITION">1</field>
    </block>
    <block type="espTm1650_setDecimal" id="espTm1650_setDecimal">
        <field name="POSITION">2</field>
        <field name="STATE">True</field>
    </block>
    <block type="espTm1650_setBrightness" id="espTm1650_setBrightness">
        <value name="BRIGHTNESS">
            <shadow type="math_number">
                <field name="NUM">4</field>
            </shadow>
        </value>
    </block>
    <block type="espTm1650_setDisplay" id="espTm1650_setDisplay">
        <field name="STATE">True</field>
    </block>
    <block type="espTm1650_clear" id="espTm1650_clear"></block>
</category>    `;
}

exports = registerToolboxs;
