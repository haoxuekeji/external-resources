/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_TM1650_CATEGORY}" id="TM1650_CATEGORY" colour="#FF7F50" secondaryColour="#FF6347">
    <block type="tm1650_init" id="tm1650_init">
    </block>
    <block type="tm1650_display" id="tm1650_display">
    </block>
    <block type="tm1650_displayString" id="tm1650_displayString">
        <value name="DATA">
            <shadow type="text">
                <field name="TEXT">Open</field>
            </shadow>
        </value>
    </block>    
    <block type="tm1650_setBrightness" id="tm1650_setBrightness">
        <value name="BRT">
            <shadow type="tm1650_brightnessNumber">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>
    <block type="tm1650_setPoint" id="tm1650_setPoint">
        <value name="DATA">
            <shadow type="math_integer">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="tm1650_clear" id="tm1650_clear">
    </block>


</category>`;
}

exports = addToolbox;
