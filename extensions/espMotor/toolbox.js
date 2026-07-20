/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPMOTOR_CATEGORY}" id="ESPMOTOR_CATEGORY" colour="#FF6F00" secondaryColour="#CC5800" iconURI="">
    <block type="espMotor_init" id="espMotor_init">
        <field name="MOTOR">A</field>
        <field name="IN1">16</field>
        <field name="IN2">17</field>
        <field name="EN">4</field>
    </block>
    <block type="espMotor_run" id="espMotor_run">
        <field name="MOTOR">A</field>
        <field name="DIR">1</field>
        <value name="SPEED">
            <shadow type="math_number">
                <field name="NUM">80</field>
            </shadow>
        </value>
    </block>
    <block type="espMotor_stop" id="espMotor_stop">
        <field name="MOTOR">A</field>
    </block>
    <block type="espMotor_carMove" id="espMotor_carMove">
        <field name="ACTION">forward</field>
        <value name="SPEED">
            <shadow type="math_number">
                <field name="NUM">80</field>
            </shadow>
        </value>
    </block>
    <block type="espMotor_carStop" id="espMotor_carStop"></block>
</category>    `;
}
exports = registerToolboxs;
