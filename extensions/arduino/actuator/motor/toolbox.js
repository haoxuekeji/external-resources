/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_MOTOR_CATEGORY}" id="MOTOR_CATEGORY" colour="#FF6F00" secondaryColour="#FF4F00">
    <block type="motor_run" id="motor_run">
        <value name="SPEED_VALUE">
            <shadow type="math_int9_number">
                <field name="NUM">200</field>
            </shadow>
        </value>
        <field name="SPEED">6</field>
        <field name="DIR">A2</field>
    </block>

</category>`;
}

exports = addToolbox;
